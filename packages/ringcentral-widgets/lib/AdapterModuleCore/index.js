import formatMessage from 'format-message';
import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

import IframeMessageTransport from '../IframeMessageTransport';
import headerI18n from '../../components/CallMonitorBar/i18n';
import presenceItemI18n from '../../components/PresenceItem/i18n';
import AdapterModuleCoreBase from '../AdapterModuleCoreBase';
import baseActionTypes from '../AdapterModuleCoreBase/baseActionTypes';

const ALL_CALL_PATH = '/calls';
const ACTIVE_CALL_PATH = '/calls/active';

@Module({
  deps: [
    'CallingSettings',
    'GlobalStorage',
    'Locale',
    'Presence',
    'RouterInteraction',
    'Storage',
    'Webphone',
    'CallMonitor',
    { dep: 'UserGuide', optional: true },
    { dep: 'QuickAccess', optional: true }
  ]
})
export default class AdapterModuleCore extends AdapterModuleCoreBase {
  constructor({
    prefix,
    storageKey = 'adapterCore',
    actionTypes = baseActionTypes,
    callingSettings,
    globalStorage,
    locale,
    presence,
    routerInteraction,
    webphone,
    callMonitor,
    userGuide,
    quickAccess,
    messageTransport = new IframeMessageTransport({
      targetWindow: window.parent,
    }),
    ...options
  }) {
    super({
      prefix,
      actionTypes,
      locale,
      messageTransport,
      presence,
      routerInteraction,
      globalStorage,
      storageKey,
      ...options,
    });

    this._callingSettings = callingSettings;
    this._webphone = webphone;
    this._callMonitor = callMonitor;
    this._userGuide = userGuide;
    this._quickAccess = quickAccess;

    this.addSelector(
      'localeStrings',
      () => this._locale.ready,
      () => this._locale.currentLocale,
      () => this._callMonitor.activeRingCalls.length,
      () => this._callMonitor.activeOnHoldCalls.length,
      (localeReady, currentLocale, ringingCallsLength, onHoldCallsLength) => {
        const ringCallsInfo = ringingCallsLength === 1 ?
          formatMessage(headerI18n.getString('incomingCall', currentLocale), { numberOf: ringingCallsLength }) :
          formatMessage(headerI18n.getString('incomingCalls', currentLocale), { numberOf: ringingCallsLength });
        const onHoldCallsInfo = onHoldCallsLength === 1 ?
          formatMessage(headerI18n.getString('callOnHold', currentLocale), { numberOf: onHoldCallsLength }) :
          formatMessage(headerI18n.getString('callsOnHold', currentLocale), { numberOf: onHoldCallsLength });
        const availableBtn = presenceItemI18n.getString(presenceStatus.available, currentLocale);
        const busyBtn = presenceItemI18n.getString(presenceStatus.busy, currentLocale);
        const offlineBtn = presenceItemI18n.getString(presenceStatus.offline, currentLocale);
        const doNotAcceptAnyCallsBtn = presenceItemI18n.getString(dndStatus.doNotAcceptAnyCalls, currentLocale);
        return {
          currentCallBtn: headerI18n.getString('currentCall', currentLocale),
          viewCallsBtn: headerI18n.getString('viewCalls', currentLocale),
          ringCallsInfo,
          onHoldCallsInfo,
          availableBtn,
          busyBtn,
          offlineBtn,
          doNotAcceptAnyCallsBtn
        };
      }
    );
  }

  _pushOtherStateChanges() {
    this._pushRingState();
  }

  _pushRingState({ forcePush = false } = {}) {
    if (!this.ready) return;

    // TODO: we should refactor the entire sync logic to be more
    // declarative and straightforward
    if (forcePush) {
      this._postMessage({
        type: this._messageTypes.pushLocale,
        strings: this._localeStrings
      });
    }


    if (!this._callingSettings) return;

    const { callingMode } = this._callingSettings;
    if (callingMode === callingModes.webphone) {
      const webphone = this._webphone;
      if (!webphone) {
        throw new Error('webphone is a required dependency for monitoring WebRTC call');
      }
      if (webphone.ringSession && (webphone.ringSessionId !== this._ringSessionId || forcePush)) {
        this._ringSessionId = webphone.ringSessionId;
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: true
        });
      }
      // Check if ringing is over
      if (this._ringSessionId) {
        const ringingSessions = webphone.sessions.filter(session =>
          session.callStatus === 'webphone-session-connecting' && session.direction === 'Inbound'
        );
        if (ringingSessions.length <= 0) {
          this._postMessage({
            type: this._messageTypes.pushRingState,
            ringing: false
          });
          this._ringSessionId = null;
        }
      }
      const ringingCallsLength = this._callMonitor.activeRingCalls.length;
      const onHoldCallsLength = this._callMonitor.activeOnHoldCalls.length;
      const currentStartTime = (
        this._callMonitor.activeCurrentCalls &&
        this._callMonitor.activeCurrentCalls.length > 0 &&
        this._callMonitor.activeCurrentCalls[0].startTime) || 0;
      if (
        forcePush ||
        this._lastRingCallsLength !== ringingCallsLength ||
        this._lastOnHoldCallsLength !== onHoldCallsLength ||
        this._lastCurrentStartTime !== currentStartTime
      ) {
        this._lastRingCallsLength = ringingCallsLength;
        this._lastOnHoldCallsLength = onHoldCallsLength;
        this._lastCurrentStartTime = currentStartTime;
        this._postMessage({
          type: this._messageTypes.pushCalls,
          ringingCallsLength,
          onHoldCallsLength,
          currentStartTime,
        });
        this._postMessage({
          type: this._messageTypes.pushLocale,
          strings: this._localeStrings
        });
      }
      this._showIncomingCallPage = !!(
        this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized
      );
      if (
        forcePush ||
        this._lastPath !== this._router.currentPath ||
        this._lastShowIncomingCallPage !== this._showIncomingCallPage
      ) {
        this._lastPath = this._router.currentPath;
        this._lastShowIncomingCallPage = this._showIncomingCallPage;
        const onCurrentCallPath = (
          (this._router.currentPath === ACTIVE_CALL_PATH ||
            this._router.currentPath === `${ACTIVE_CALL_PATH}/${this._webphone.activeSessionId}`) &&
          !this._showIncomingCallPage
        );
        if (
          forcePush ||
          this.onCurrentCallPath !== onCurrentCallPath ||
          this._lastShowIncomingCallPage !== this._showIncomingCallPage
        ) {
          this.onCurrentCallPath = onCurrentCallPath;
          this._lastShowIncomingCallPage = this._showIncomingCallPage;
          this._postMessage({
            type: this._messageTypes.pushOnCurrentCallPath,
            onCurrentCallPath,
          });
        }
        const onAllCallsPath = (
          this._router.currentPath === ALL_CALL_PATH &&
          !this._showIncomingCallPage
        );
        if (
          forcePush ||
          this.onAllCallsPath !== onAllCallsPath
        ) {
          this.onAllCallsPath = onAllCallsPath;
          this._postMessage({
            type: this._messageTypes.pushOnAllCallsPath,
            onAllCallsPath,
          });
        }
      }
    } else {
      const status = this._presence.telephonyStatus;
      if (this._presence.telephonyStatus !== this._telephonyStatus) {
        this._postMessage({
          type: this._messageTypes.pushRingState,
          ringing: status === 'Ringing'
        });
        this._telephonyStatus = status;
      }
    }
  }

  get localeStrings() {
    return {};
  }

  @proxify
  async _onNavigateToCurrentCall() {
    this._router.push(ACTIVE_CALL_PATH);
    if (this._userGuide && this._userGuide.started) {
      this._userGuide.dismiss();
    }
    if (this._quickAccess && this._quickAccess.entered) {
      this._quickAccess.exit();
    }
    if (this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized) {
      this._webphone.toggleMinimized(this._webphone.ringSession.id);
    }
  }

  @proxify
  async _onNavigateToViewCalls() {
    this._router.push(ALL_CALL_PATH);
    if (this._userGuide && this._userGuide.started) {
      this._userGuide.dismiss();
    }
    if (this._quickAccess && this._quickAccess.entered) {
      this._quickAccess.exit();
    }
    if (this._webphone && this._webphone.ringSession && !this._webphone.ringSession.minimized) {
      this._webphone.toggleMinimized(this._webphone.ringSession.id);
    }
  }
}
