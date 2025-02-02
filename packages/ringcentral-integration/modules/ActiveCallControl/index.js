import { selector } from '../../lib/selector';

import { Module } from '../../lib/di';
import Pollable from '../../lib/Pollable';
import moduleStatuses from '../../enums/moduleStatuses';
import callErrors from '../Call/callErrors';
import ensureExist from '../../lib/ensureExist';
import actionTypes from './actionTypes';
import getActiveCallControlReducer from './getActiveCallControlReducer';
import getDataReducer from './getDataReducer';
import { normalizeSession, requestURI, confictError } from './helpers';
import callControlError from './callControlError';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const DEFAULT_BUSY_TIMEOUT = 3 * 1000;
const telephonySessionsEndPoint = /\/telephony\/sessions$/;
const storageKey = 'activeCallControl';
const subscribeEvent = '/account/~/extension/~/telephony/sessions';

@Module({
  deps: [
    'Client',
    'Auth',
    'Subscription',
    'ConnectivityMonitor',
    'RolesAndPermissions',
    'CallMonitor',
    'Alert',
    'NumberValidate',
    'AccountInfo',
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'ActiveCallControlOptions', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
  ],
})
export default class ActiveCallControl extends Pollable {
  constructor({
    client,
    auth,
    ttl = DEFAULT_TTL,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    storage,
    subscription,
    connectivityMonitor,
    rolesAndPermissions,
    availabilityMonitor,
    tabManager,
    callMonitor,
    polling = false,
    disableCache = false,
    alert,
    numberValidate,
    accountInfo,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._client = client;
    if (!disableCache) {
      this._storage = storage;
    }
    this._subscription = this::ensureExist(subscription, 'subscription');
    this._connectivityMonitor = this::ensureExist(
      connectivityMonitor,
      'connectivityMonitor',
    );
    this._rolesAndPermissions = this::ensureExist(
      rolesAndPermissions,
      'rolesAndPermissions',
    );
    this._availabilityMonitor = availabilityMonitor;
    this._callMonitor = this::ensureExist(callMonitor, 'callMonitor');
    this._tabManager = tabManager;
    this._ttl = ttl;
    this._timeToRetry = timeToRetry;
    this._auth = this::ensureExist(auth, 'auth');
    this._promise = null;
    this._lastSubscriptionMessage = null;
    this._storageKey = storageKey;
    this._polling = polling;
    this._alert = alert;
    this._numberValidate = numberValidate;
    this._accountInfo = accountInfo;

    if (this._storage) {
      this._reducer = getActiveCallControlReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._storageKey,
        reducer: getDataReducer(this.actionTypes),
      });
    } else {
      this._reducer = getActiveCallControlReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes),
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._connectivity = this._connectivityMonitor.connectivity;
      await this._init();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    } else if (this.ready) {
      this._subscriptionHandler();
      this._checkConnectivity();
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      this._subscription.ready &&
      this._connectivityMonitor.ready &&
      this._callMonitor.ready &&
      (!this._tabManager || this._tabManager.ready) &&
      this._rolesAndPermissions.ready &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        (!!this._storage && !this._storage.ready) ||
        !this._subscription.ready ||
        (!!this._tabManager && !this._tabManager.ready) ||
        !this._connectivityMonitor.ready ||
        !this._callMonitor.ready ||
        !this._rolesAndPermissions.ready ||
        (!!this._availabilityMonitor && !this._availabilityMonitor.ready)) &&
      this.ready
    );
  }

  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  get _hasPermission() {
    return this._rolesAndPermissions.ringoutEnabled;
  }

  _shouldFetch() {
    return !this._tabManager || this._tabManager.active;
  }

  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    await this._promise;
  }

  async _fetchData() {
    try {
      await this._syncData();
      if (this._polling) {
        this._startPolling();
      }
      this._promise = null;
    } catch (error) {
      this._promise = null;
      if (this._polling) {
        this._startPolling(this.timeToRetry);
      } else {
        this._retry();
      }
      throw error;
    }
  }

  _startPolling(t = this.timestamp + this.ttl + 10 - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this._tabManager || this._tabManager.active) {
        if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
          this.fetchData();
        } else {
          this._startPolling();
        }
      } else if (this.timestamp && Date.now() - this.timestamp < this.ttl) {
        this._startPolling();
      } else {
        this._startPolling(this.timeToRetry);
      }
    }, t);
  }

  async _syncData() {
    try {
      const activeSessionsMap = {};
      for (const sessionId in this.activeSessions) {
        if (sessionId) {
          const result = await this.getPartyData(sessionId);
          activeSessionsMap[sessionId] = result;
        }
      }
      this.store.dispatch({
        type: this.actionTypes.updateActiveSessions,
        activeSessionsMap,
        timestamp: Date.now(),
      });
    } catch (error) {
      throw error;
    }
  }

  async _init() {
    if (!this._hasPermission) return;
    this._subscription.subscribe(subscribeEvent);
    if (this._shouldFetch()) {
      try {
        await this.fetchData();
      } catch (e) {
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
  }

  _subscriptionHandler() {
    if (
      !this.ready ||
      (this._storage && this._tabManager && !this._tabManager.active)
    ) {
      return;
    }
    const { message } = this._subscription;
    if (
      message &&
      message !== this._lastSubscriptionMessage &&
      telephonySessionsEndPoint.test(message.event) &&
      message.body
    ) {
      this._lastSubscriptionMessage = message;
      const { sessionId, parties } = message.body;
      this.store.dispatch({
        type: this.actionTypes.updateActiveSessionStatus,
        sessionId,
        party: parties[0],
      });
    }
  }

  removeActiveSession(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.removeActiveSession,
      sessionId,
    });
  }

  // count it as load (should only call on container init step)
  setActiveSessionId(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.setActiveSessionId,
      sessionId,
    });
  }

  _checkConnectivity() {
    if (
      this._connectivityMonitor &&
      this._connectivityMonitor.ready &&
      this._connectivity !== this._connectivityMonitor.connectivity
    ) {
      this._connectivity = this._connectivityMonitor.connectivity;
      if (this._connectivity) {
        this.fetchData();
      }
    }
  }

  async patch({ url = null, query = null, body = null }) {
    try {
      await this._client.service._platform.send({
        method: 'PATCH',
        url,
        query,
        body,
      });
    } catch (error) {
      throw error;
    }
  }

  getActiveSession(sessionId) {
    const partyId = this.callPartyIdMap[sessionId];
    const activeSession = this.activeSessions[sessionId];
    return activeSession && activeSession[partyId];
  }

  async mute(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.mute,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).mute;
      await this.patch({
        url,
        body: {
          muted: true,
        },
      });
      this.store.dispatch({
        type: this.actionTypes.muteSuccess,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.muteConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.muteError,
      });
    }
  }

  async unmute(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.unmute,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).mute;
      await this.patch({
        url,
        body: {
          muted: false,
        },
      });
      this.store.dispatch({
        type: this.actionTypes.unmuteSuccess,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.unMuteConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.unmuteError,
      });
    }
  }

  async startRecord(sessionId) {
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).record;
      const _response = await this._client.service._platform.post(url);
      const response = JSON.parse(_response._text);
      this.store.dispatch({
        type: this.actionTypes.startRecord,
        activeSession,
        response,
      });
    } catch (error) {
      this.store.dispatch({
        type: this.actionTypes.recordFail,
        sessionId,
      });
    }
  }

  getRecordingId(sessionId) {
    const partyId = this.callPartyIdMap[sessionId];
    const recodingId = this.recordingIds[sessionId];
    return recodingId[partyId].id;
  }

  async stopRecord(sessionId) {
    try {
      const activeSession = this.getActiveSession(sessionId);
      const recordingId = this.getRecordingId(sessionId);
      activeSession.recordingId = recordingId;
      const url = requestURI(activeSession).stopRecord;
      this.patch({
        url,
        body: {
          active: false,
        },
      });
      this.store.dispatch({
        type: this.actionTypes.stopRecord,
        activeSession,
      });
    } catch (error) {
      throw error;
    }
  }

  async hangUp(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.hangUp,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).hangUp;
      await this._client.service._platform.delete(url);
      if (typeof this._onCallEndFunc === 'function') {
        this._onCallEndFunc();
      }
      this.store.dispatch({
        type: this.actionTypes.hangUpSuccess,
        sessionId,
      });
    } catch (error) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }

      this.store.dispatch({
        type: this.actionTypes.hangUpError,
      });
    }
  }

  async reject(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.reject,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).reject;
      await this._client.service._platform.post(url);
      this.store.dispatch({
        type: this.actionTypes.rejectSuccess,
        sessionId,
      });
    } catch (error) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.rejectError,
      });
    }
  }

  async hold(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.hold,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).hold;
      await this._client.service._platform.post(url);
      this.store.dispatch({
        type: this.actionTypes.holdSuccess,
        activeSession,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.holdConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }

      this.store.dispatch({
        type: this.actionTypes.holdError,
      });
    }
  }

  async unhold(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.unhold,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).unhold;
      await this._client.service._platform.post(url);
      this.store.dispatch({
        type: this.actionTypes.unholdSuccess,
        activeSession,
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.unHoldConflictError,
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({
          message: callControlError.generalError,
        });
      }
      this.store.dispatch({
        type: this.actionTypes.holdError,
      });
    }
  }

  async transfer(transferNumber, sessionId) {
    this.store.dispatch({
      type: this.actionTypes.transfer,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).transfer;
      const validatedResult = await this._numberValidate.validateNumbers([
        transferNumber,
      ]);
      if (!validatedResult.result) {
        validatedResult.errors.forEach((error) => {
          if (
            !this._availabilityMonitor ||
            !this._availabilityMonitor.checkIfHAError(error)
          ) {
            this._alert.warning({
              message: callErrors[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          }
        });
        this.store.dispatch({
          type: this.actionTypes.transferError,
        });
        return;
      }
      const validPhoneNumber =
        validatedResult.numbers[0] && validatedResult.numbers[0].e164;
      let phoneNumber = validPhoneNumber;
      if (validPhoneNumber.indexOf('+') === -1) {
        phoneNumber = [
          this._accountInfo.mainCompanyNumber,
          validPhoneNumber,
        ].join('*');
      }
      await this._client.service._platform.post(url, {
        phoneNumber,
      });
      this.store.dispatch({
        type: this.actionTypes.transferSuccess,
      });
    } catch (error) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(error)
      ) {
        this._alert.warning({ message: callControlError.generalError });
      }
      this.store.dispatch({
        type: this.actionTypes.transferError,
      });
    }
  }

  // Incomplete Implementation?
  async flip(flipValue, sessionId) {
    this.store.dispatch({
      type: this.actionTypes.flip,
      timestamp: Date.now(),
    });
    try {
      const activeSession = this.getActiveSession(sessionId);
      const url = requestURI(activeSession).flip;
      await this._client.service._platform.post(url, {
        callFlipId: flipValue,
      });
      this.store.dispatch({
        type: this.actionTypes.flipSuccess,
      });
    } catch (error) {
      this.store.dispatch({
        type: this.actionTypes.flipError,
      });
      throw error;
    }
  }

  async forward() {
    // No implement at the moment
    // Need to check the API document
  }

  async getCallSessionStatus() {
    // No implement at the moment
    // Need to check the API document
  }

  async getPartyData(sessionId) {
    const activeSession = this.getActiveSession(sessionId);
    const url = requestURI(activeSession).getPartyData;
    const { telephonySessionId, partyId } = activeSession;
    if (!telephonySessionId || !partyId) {
      return;
    }
    try {
      const _response = await this._client.service._platform.get(url);
      const response = JSON.parse(_response._text);
      return response;
    } catch (error) {
      const errRgx = /4[0-9][0-9]/g;
      if (errRgx.test(error.message)) {
        this.removeActiveSession(sessionId);
      }
      throw error;
    }
  }

  get data() {
    return (
      (this._storage &&
        this._storage.ready &&
        this._storage.getItem(this._storageKey)) ||
      this.state
    );
  }

  get activeSessionId() {
    return this.data.activeSessionId || null;
  }

  get recordingIds() {
    return this.data.recordingIds || null;
  }

  get activeSessionsStatus() {
    return this.data.activeSessionsStatus || {};
  }

  /**
   * Mitigation strategy for avoiding 404/409 on call control endpoings.
   * This should gradually move towards per session controls rather than
   * a global busy timeout.
   */
  get busy() {
    return Date.now() - this.data.busy < DEFAULT_BUSY_TIMEOUT;
  }

  get timestamp() {
    return this.data.timestamp;
  }

  get timeToRetry() {
    return this._timeToRetry;
  }

  get ttl() {
    return this._ttl;
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }

  @selector
  callPartyIdMap = [
    () => this._callMonitor.calls,
    (calls) =>
      calls.reduce((accumulator, call) => {
        const { sessionId, partyId } = call;
        accumulator[sessionId] = partyId;
        return accumulator;
      }, {}),
  ];

  @selector
  recordingId = [
    () => this.activeSessionId,
    () => this.recordingIds,
    (activeSessionId, recordingIds) => recordingIds[activeSessionId],
  ];

  @selector
  activeSession = [
    () => this.activeSessionId,
    () => this.activeSessions,
    (sessionId) => this.getActiveSession(sessionId),
  ];

  @selector
  activeSessions = [
    () => this._callMonitor.calls,
    () => this.activeSessionsStatus,
    (calls, activeSessionsStatus) => {
      const reducer = (accumulator, call) => {
        const { sessionId, partyId } = call;
        const activeSessionStatuses = activeSessionsStatus[sessionId];
        const activeSessionStatus =
          (activeSessionStatuses && activeSessionStatuses[partyId]) || {};
        if (!accumulator[sessionId]) {
          accumulator[sessionId] = {};
        }
        accumulator[sessionId][partyId] = normalizeSession({
          call,
          activeSessionStatus,
        });
        return accumulator;
      };
      return calls.reduce(reducer, {});
    },
  ];
}
