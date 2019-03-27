"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.to-iso-string");

var _di = require("../../lib/di");

var _Pollable2 = _interopRequireDefault(require("../../lib/Pollable"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _selector = require("../../lib/selector");

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _syncTypes = _interopRequireDefault(require("../../enums/syncTypes"));

var messageHelper = _interopRequireWildcard(require("../../lib/messageHelper"));

var _batchApiHelper = require("../../lib/batchApiHelper");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getReducer = _interopRequireDefault(require("./getReducer"));

var _getDataReducer = _interopRequireDefault(require("./getDataReducer"));

var _errors = _interopRequireDefault(require("./errors"));

var _debounce = _interopRequireDefault(require("../../lib/debounce"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var DEFAULT_CONVERSATIONS_LOAD_LENGTH = 10;
var DEFAULT_CONVERSATION_LOAD_LENGTH = 100;
var DEFAULT_TTL = 30 * 60 * 1000;
var DEFAULT_REFRESH_LOCK = 5 * 60 * 1000;
var DEFAULT_RETRY = 62 * 1000;
var DEFAULT_DAYSPAN = 7; // default to load 7 days's messages

var DEFAULT_MESSAGES_FILTER = function DEFAULT_MESSAGES_FILTER(list) {
  return list;
}; // Number of messages to be updated in one time


var UPDATE_MESSAGE_ONCE_COUNT = 20;

function getSyncParams(_ref) {
  var recordCount = _ref.recordCount,
      conversationLoadLength = _ref.conversationLoadLength,
      dateFrom = _ref.dateFrom,
      dateTo = _ref.dateTo,
      syncToken = _ref.syncToken;

  if (syncToken) {
    return {
      syncToken: syncToken,
      syncType: _syncTypes.default.iSync
    };
  }

  var params = {
    recordCountPerConversation: conversationLoadLength,
    syncType: _syncTypes.default.fSync
  };

  if (recordCount) {
    params.recordCount = recordCount;
  }

  if (dateFrom) {
    params.dateFrom = dateFrom.toISOString();
  }

  if (dateTo) {
    params.dateTo = dateTo.toISOString();
  }

  return params;
}
/**
 * @class

 * @description Messages data managing module
 * fetch conversations
 * handle new message subscription
 */


var MessageStore = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'Auth', 'Subscription', 'ConnectivityMonitor', 'RolesAndPermissions', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'MessageStoreOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Pollable) {
  _inherits(MessageStore, _Pollable);

  function MessageStore(_ref2) {
    var _context;

    var _this;

    var auth = _ref2.auth,
        alert = _ref2.alert,
        client = _ref2.client,
        subscription = _ref2.subscription,
        storage = _ref2.storage,
        tabManager = _ref2.tabManager,
        rolesAndPermissions = _ref2.rolesAndPermissions,
        connectivityMonitor = _ref2.connectivityMonitor,
        availabilityMonitor = _ref2.availabilityMonitor,
        _ref2$ttl = _ref2.ttl,
        ttl = _ref2$ttl === void 0 ? DEFAULT_TTL : _ref2$ttl,
        _ref2$refreshLock = _ref2.refreshLock,
        refreshLock = _ref2$refreshLock === void 0 ? DEFAULT_REFRESH_LOCK : _ref2$refreshLock,
        _ref2$polling = _ref2.polling,
        polling = _ref2$polling === void 0 ? false : _ref2$polling,
        _ref2$disableCache = _ref2.disableCache,
        disableCache = _ref2$disableCache === void 0 ? false : _ref2$disableCache,
        _ref2$timeToRetry = _ref2.timeToRetry,
        timeToRetry = _ref2$timeToRetry === void 0 ? DEFAULT_RETRY : _ref2$timeToRetry,
        _ref2$daySpan = _ref2.daySpan,
        daySpan = _ref2$daySpan === void 0 ? DEFAULT_DAYSPAN : _ref2$daySpan,
        _ref2$conversationsLo = _ref2.conversationsLoadLength,
        conversationsLoadLength = _ref2$conversationsLo === void 0 ? DEFAULT_CONVERSATIONS_LOAD_LENGTH : _ref2$conversationsLo,
        _ref2$conversationLoa = _ref2.conversationLoadLength,
        conversationLoadLength = _ref2$conversationLoa === void 0 ? DEFAULT_CONVERSATION_LOAD_LENGTH : _ref2$conversationLoa,
        _ref2$messagesFilter = _ref2.messagesFilter,
        messagesFilter = _ref2$messagesFilter === void 0 ? DEFAULT_MESSAGES_FILTER : _ref2$messagesFilter,
        options = _objectWithoutProperties(_ref2, ["auth", "alert", "client", "subscription", "storage", "tabManager", "rolesAndPermissions", "connectivityMonitor", "availabilityMonitor", "ttl", "refreshLock", "polling", "disableCache", "timeToRetry", "daySpan", "conversationsLoadLength", "conversationLoadLength", "messagesFilter"]);

    _classCallCheck(this, MessageStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageStore).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes.default
    })));
    _this._debouncedSetConversationAsRead = (0, _debounce.default)(_this._setConversationAsRead, 500, true);

    _initializerDefineProperty(_this, "allConversations", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "textConversations", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "textUnreadCounts", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "faxMessages", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "faxUnreadCounts", _descriptor5, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "voicemailMessages", _descriptor6, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "voiceUnreadCounts", _descriptor7, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "unreadCounts", _descriptor8, _assertThisInitialized(_assertThisInitialized(_this)));

    _this._auth = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, auth, 'auth');
    _this._alert = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, alert, 'alert');
    _this._client = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, client, 'client');
    _this._subscription = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, subscription, 'subscription');
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, rolesAndPermissions, 'rolesAndPermissions');

    if (!disableCache) {
      _this._storage = storage;
    }

    _this._dataStorageKey = 'messageStoreData';
    _this._tabManager = tabManager;
    _this._connectivityMonitor = connectivityMonitor;
    _this._availabilityMonitor = availabilityMonitor;
    _this._ttl = ttl;
    _this._refreshLock = refreshLock;
    _this._timeToRetry = timeToRetry;
    _this._polling = polling;
    _this._conversationsLoadLength = conversationsLoadLength;
    _this._conversationLoadLength = conversationLoadLength;
    _this._messagesFilter = messagesFilter;
    _this._daySpan = daySpan;

    if (_this._storage) {
      _this._reducer = (0, _getReducer.default)(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._dataStorageKey,
        reducer: (0, _getDataReducer.default)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getReducer.default)(_this.actionTypes, {
        data: (0, _getDataReducer.default)(_this.actionTypes, false)
      });
    }

    _this._promise = null;
    _this._lastSubscriptionMessage = null; // setting up event handlers for message

    _this._newInboundMessageNotificationHandlers = [];
    _this._messageUpdatedHandlers = [];
    _this._dispatchedMessageIds = [];
    return _this;
  }

  _createClass(MessageStore, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return this._init();

              case 3:
                _context2.next = 6;
                break;

              case 5:
                if (this._isDataReady()) {
                  /**
                   * When there is cached data, triggering init will immediately trigger initSuccess.
                   * This causes the code to run this._checkConnectivity() before initializing
                   * this._connectivity, forcing the the module to always run sync on app restart.
                   * Moving the this._connectivity initializating just before initSuccess ensure
                   * that this._checkConnectivity is only run when this._connectivity has been set.
                   */
                  if (this._connectivityMonitor) {
                    this._connectivity = this._connectivityMonitor.connectivity;
                  }

                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if (this._shouldReset()) {
                  this._clearTimeout();

                  this._promise = null;
                  this.store.dispatch({
                    type: this.actionTypes.resetSuccess
                  });
                } else if (this.ready) {
                  this._subscriptionHandler();

                  this._checkConnectivity();
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this._auth.loggedIn && (!this._storage || this._storage.ready) && (!this._tabManager || this._tabManager.ready) && (!this._connectivityMonitor || this._connectivityMonitor.ready) && this._subscription.ready && this._rolesAndPermissions.ready && (!this._availabilityMonitor || this._availabilityMonitor.ready) && this.pending);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!((!this._auth.loggedIn || this._storage && !this._storage.ready || !this._subscription.ready || !!this._connectivityMonitor && !this._connectivityMonitor.ready || !this._rolesAndPermissions.ready || this._tabManager && !this._tabManager.ready || this._availabilityMonitor && !this._availabilityMonitor.ready) && this.ready);
    }
  }, {
    key: "_isDataReady",
    value: function _isDataReady() {
      return this.status === _moduleStatuses.default.initializing && this.syncInfo !== null;
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (this._hasPermission) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                if (!this._shouldFetch()) {
                  _context3.next = 15;
                  break;
                }

                _context3.prev = 4;
                _context3.next = 7;
                return this.fetchData();

              case 7:
                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](4);
                console.error('fetchData error:', _context3.t0);

                this._retry();

              case 13:
                _context3.next = 16;
                break;

              case 15:
                if (this._polling) {
                  this._startPolling();
                } else {
                  this._retry();
                }

              case 16:
                this._subscription.subscribe('/account/~/extension/~/message-store');

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this, [[4, 9]]);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return (!this._tabManager || this._tabManager.active) && (!this.timestamp || Date.now() - this.timestamp > this.refreshLock);
    }
  }, {
    key: "_subscriptionHandler",
    value: function _subscriptionHandler() {
      if (this._storage && this._tabManager && !this._tabManager.active) {
        return;
      }

      var accountExtesionEndPoint = /\/message-store$/;
      var message = this._subscription.message;

      if (message && message !== this._lastSubscriptionMessage && accountExtesionEndPoint.test(message.event) && message.body && message.body.changes) {
        this._lastSubscriptionMessage = this._subscription.message;
        this.fetchData({
          passive: true
        });
      }
    }
  }, {
    key: "_checkConnectivity",
    value: function _checkConnectivity() {
      if (this._connectivityMonitor && this._connectivityMonitor.ready && this._connectivity !== this._connectivityMonitor.connectivity) {
        this._connectivity = this._connectivityMonitor.connectivity;

        if (this._connectivity) {
          this.fetchData();
        }
      }
    }
  }, {
    key: "_syncFunction",
    value: function () {
      var _syncFunction2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref3) {
        var recordCount, conversationLoadLength, dateFrom, dateTo, syncToken, _ref3$receivedRecords, receivedRecordsLength, params, _ref4, records, syncInfo, olderDateTo, olderRecordResult;

        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                recordCount = _ref3.recordCount, conversationLoadLength = _ref3.conversationLoadLength, dateFrom = _ref3.dateFrom, dateTo = _ref3.dateTo, syncToken = _ref3.syncToken, _ref3$receivedRecords = _ref3.receivedRecordsLength, receivedRecordsLength = _ref3$receivedRecords === void 0 ? 0 : _ref3$receivedRecords;
                params = getSyncParams({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  dateTo: dateTo,
                  syncToken: syncToken
                });
                _context4.next = 4;
                return this._client.account().extension().messageSync().list(params);

              case 4:
                _ref4 = _context4.sent;
                records = _ref4.records;
                syncInfo = _ref4.syncInfo;
                receivedRecordsLength += records.length;

                if (!(!syncInfo.olderRecordsExist || receivedRecordsLength >= recordCount)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", {
                  records: records,
                  syncInfo: syncInfo
                });

              case 10:
                _context4.next = 12;
                return (0, _sleep.default)(500);

              case 12:
                olderDateTo = new Date(records[records.length - 1].creationTime);
                _context4.next = 15;
                return this._syncFunction({
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  dateTo: olderDateTo
                });

              case 15:
                olderRecordResult = _context4.sent;
                return _context4.abrupt("return", {
                  records: records.concat(olderRecordResult.records),
                  syncInfo: syncInfo
                });

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function _syncFunction(_x) {
        return _syncFunction2.apply(this, arguments);
      }

      return _syncFunction;
    }()
  }, {
    key: "getSyncActionType",
    value: function getSyncActionType(_ref5) {
      var dateTo = _ref5.dateTo,
          syncToken = _ref5.syncToken;

      if (syncToken) {
        return this.actionTypes.conversationsISyncSuccess;
      }

      return this.actionTypes.conversationsFSyncSuccess;
    }
  }, {
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _ref6,
            dateTo,
            _ref6$conversationsLo,
            conversationsLoadLength,
            _ref6$conversationLoa,
            conversationLoadLength,
            _ref6$passive,
            passive,
            ownerId,
            dateFrom,
            syncToken,
            recordCount,
            data,
            actionType,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref6 = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {}, dateTo = _ref6.dateTo, _ref6$conversationsLo = _ref6.conversationsLoadLength, conversationsLoadLength = _ref6$conversationsLo === void 0 ? this._conversationsLoadLength : _ref6$conversationsLo, _ref6$conversationLoa = _ref6.conversationLoadLength, conversationLoadLength = _ref6$conversationLoa === void 0 ? this._conversationLoadLength : _ref6$conversationLoa, _ref6$passive = _ref6.passive, passive = _ref6$passive === void 0 ? false : _ref6$passive;
                this.store.dispatch({
                  type: this.actionTypes.conversationsSync
                });
                ownerId = this._auth.ownerId;
                _context5.prev = 3;
                dateFrom = new Date();
                dateFrom.setDate(dateFrom.getDate() - this._daySpan);
                syncToken = dateTo ? null : this.syncInfo && this.syncInfo.syncToken;
                recordCount = conversationsLoadLength * conversationLoadLength;
                _context5.prev = 8;
                _context5.next = 11;
                return this._syncFunction({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  syncToken: syncToken,
                  dateTo: dateTo
                });

              case 11:
                data = _context5.sent;
                _context5.next = 24;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](8);

                if (!(_context5.t0 && (_context5.t0.message === 'Parameter [syncToken] value is invalid' || _context5.t0.message === 'Parameter [syncToken] is invalid'))) {
                  _context5.next = 23;
                  break;
                }

                _context5.next = 19;
                return this._syncFunction({
                  recordCount: recordCount,
                  conversationLoadLength: conversationLoadLength,
                  dateFrom: dateFrom,
                  syncToken: null,
                  dateTo: dateTo
                });

              case 19:
                data = _context5.sent;
                syncToken = null;
                _context5.next = 24;
                break;

              case 23:
                throw _context5.t0;

              case 24:
                if (this._auth.ownerId === ownerId) {
                  actionType = this.getSyncActionType({
                    dateTo: dateTo,
                    syncToken: syncToken
                  });
                  this.store.dispatch({
                    type: actionType,
                    recordCount: recordCount,
                    records: this._messagesFilter(data.records),
                    syncInfo: data.syncInfo,
                    timestamp: Date.now(),
                    conversationStore: this.conversationStore
                  }); // this is only executed in passive sync mode (aka. invoked by subscription)

                  if (passive) {
                    this._dispatchMessageHandlers(this._messagesFilter(data.records));
                  }
                }

                _context5.next = 33;
                break;

              case 27:
                _context5.prev = 27;
                _context5.t1 = _context5["catch"](3);

                if (!(this._auth.ownerId === ownerId)) {
                  _context5.next = 33;
                  break;
                }

                console.error(_context5.t1);
                this.store.dispatch({
                  type: this.actionTypes.conversationsSyncError,
                  error: _context5.t1
                });
                throw _context5.t1;

              case 33:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[3, 27], [8, 14]]);
      }));

      function _syncData() {
        return _syncData2.apply(this, arguments);
      }

      return _syncData;
    }()
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _ref7,
            dateTo,
            conversationsLoadLength,
            conversationLoadLength,
            _ref7$passive,
            passive,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref7 = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {}, dateTo = _ref7.dateTo, conversationsLoadLength = _ref7.conversationsLoadLength, conversationLoadLength = _ref7.conversationLoadLength, _ref7$passive = _ref7.passive, passive = _ref7$passive === void 0 ? false : _ref7$passive;
                _context6.prev = 1;
                _context6.next = 4;
                return this._syncData({
                  dateTo: dateTo,
                  conversationsLoadLength: conversationsLoadLength,
                  conversationLoadLength: conversationLoadLength,
                  passive: passive
                });

              case 4:
                if (this._polling) {
                  this._startPolling();
                }

                this._promise = null;
                _context6.next = 13;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);
                this._promise = null;

                if (this._polling) {
                  this._startPolling(this.timeToRetry);
                } else {
                  this._retry();
                }

                throw _context6.t0;

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this, [[1, 8]]);
      }));

      function _fetchData() {
        return _fetchData2.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: "_startPolling",
    value: function _startPolling() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();

      this._clearTimeout();

      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;

        if ((!_this3._tabManager || _this3._tabManager.active) && _this3.pageNumber === 1) {
          if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
            _this3.fetchData();
          } else {
            _this3._startPolling();
          }
        } else if (_this3.timestamp && Date.now() - _this3.timestamp < _this3.ttl) {
          _this3._startPolling();
        } else {
          _this3._startPolling(_this3.timeToRetry);
        }
      }, t);
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _ref8,
            _ref8$passive,
            passive,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref8 = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {}, _ref8$passive = _ref8.passive, passive = _ref8$passive === void 0 ? false : _ref8$passive;

                if (!this._promise) {
                  this._promise = this._fetchData({
                    passive: passive
                  });
                }

                _context7.next = 4;
                return this._promise;

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function fetchData() {
        return _fetchData3.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "onNewInboundMessage",
    value: function onNewInboundMessage(handler) {
      if (typeof handler === 'function') {
        this._newInboundMessageNotificationHandlers.push(handler);
      }
    }
  }, {
    key: "onMessageUpdated",
    value: function onMessageUpdated(handler) {
      if (typeof handler === 'function') {
        this._messageUpdatedHandlers.push(handler);
      }
    }
    /**
     * Dispatch events to different handlers
     */

  }, {
    key: "_dispatchMessageHandlers",
    value: function _dispatchMessageHandlers(records) {
      var _this4 = this;

      // Sort all records by creation time
      records = records.slice().sort(function (a, b) {
        return new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime();
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var record = _step.value;

          var _ref9 = record || {},
              id = _ref9.id,
              direction = _ref9.direction,
              availability = _ref9.availability,
              messageStatus = _ref9.messageStatus,
              readStatus = _ref9.readStatus,
              lastModifiedTime = _ref9.lastModifiedTime,
              creationTime = _ref9.creationTime; // Notify when new message incoming
          // fix mix old messages and new messages logic error.


          if (!_this4._messageDispatched(record)) {
            // Mark last 10 messages that dispatched
            // To present dispatching same record twice
            _this4._dispatchedMessageIds = [{
              id: id,
              lastModifiedTime: lastModifiedTime
            }].concat(_this4._dispatchedMessageIds).slice(0, 20);

            _this4._messageUpdatedHandlers.forEach(function (handler) {
              return handler(record);
            }); // For new inbound message notification


            if (direction === 'Inbound' && readStatus === 'Unread' && messageStatus === 'Received' && availability === 'Alive' && new Date(creationTime).getTime() > new Date(lastModifiedTime).getTime() - 600 * 1000) {
              _this4._newInboundMessageNotificationHandlers.forEach(function (handler) {
                return handler(record);
              });
            }
          }
        };

        for (var _iterator = records[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_messageDispatched",
    value: function _messageDispatched(message) {
      return this._dispatchedMessageIds.some(function (m) {
        return m.id === message.id && m.lastModifiedTime === message.lastModifiedTime;
      });
    }
  }, {
    key: "pushMessages",
    value: function () {
      var _pushMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(records) {
        return regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateMessages,
                  records: records
                });

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function pushMessages(_x2) {
        return _pushMessages.apply(this, arguments);
      }

      return pushMessages;
    }()
  }, {
    key: "pushMessage",
    value: function pushMessage(record) {
      this.pushMessages([record]);
    }
  }, {
    key: "_updateMessageApi",
    value: function () {
      var _updateMessageApi2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(messageId, status) {
        var body, updateRequest;
        return regeneratorRuntime.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                body = {
                  readStatus: status
                };
                _context9.next = 3;
                return this._client.account().extension().messageStore(messageId).put(body);

              case 3:
                updateRequest = _context9.sent;
                return _context9.abrupt("return", updateRequest);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee8, this);
      }));

      function _updateMessageApi(_x3, _x4) {
        return _updateMessageApi2.apply(this, arguments);
      }

      return _updateMessageApi;
    }()
  }, {
    key: "deleteMessageApi",
    value: function () {
      var _deleteMessageApi = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(messageId) {
        var response;
        return regeneratorRuntime.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._client.account().extension().messageStore(messageId).delete();

              case 2:
                response = _context10.sent;
                return _context10.abrupt("return", response);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9, this);
      }));

      function deleteMessageApi(_x5) {
        return _deleteMessageApi.apply(this, arguments);
      }

      return deleteMessageApi;
    }()
  }, {
    key: "sliceConversations",
    value: function sliceConversations() {
      var _this5 = this;

      var conversationIds = Object.keys(this.conversationStore);
      var messages = conversationIds.reduce(function (acc, id) {
        return acc.concat(_this5.conversationStore[id]);
      }, []);

      var messageIds = this._messagesFilter(messages).map(function (item) {
        return item.id;
      });

      this.store.dispatch({
        type: this.actionTypes.sliceConversations,
        messageIds: messageIds
      });
    }
    /**
     * Batch update messages status
     *
     * @param {*} messageIds
     * @param {*} body
     * @returns
     * @memberof MessageStore
     */

  }, {
    key: "_batchUpdateMessagesApi",
    value: function () {
      var _batchUpdateMessagesApi2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(messageIds, body) {
        var ids, platform, responses;
        return regeneratorRuntime.wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(!messageIds || messageIds.length === 0)) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return");

              case 2:
                ids = decodeURIComponent(messageIds.join(','));
                platform = this._client.service.platform();
                _context11.next = 6;
                return (0, _batchApiHelper.batchPutApi)({
                  platform: platform,
                  url: "/account/~/extension/~/message-store/".concat(ids),
                  body: body
                });

              case 6:
                responses = _context11.sent;
                return _context11.abrupt("return", responses);

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee10, this);
      }));

      function _batchUpdateMessagesApi(_x6, _x7) {
        return _batchUpdateMessagesApi2.apply(this, arguments);
      }

      return _batchUpdateMessagesApi;
    }()
    /**
     * Change messages' status to `READ` or `UNREAD`.
     * Update 20 messages per time with `_batchUpdateMessagesApi`,
     * or `_updateMessageApi` one by one in recursion.
     *
     * @param {*} messageIds
     * @param {*} status
     * @returns
     * @memberof MessageStore
     */

  }, {
    key: "_updateMessagesApi",
    value: function () {
      var _updateMessagesApi2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(messageIds, status) {
        var allMessageIds, results, index, nextLength, result, leftIds, body, responses, ownerId;
        return regeneratorRuntime.wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                allMessageIds = messageIds;

                if (!(!allMessageIds || allMessageIds.length === 0)) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt("return", []);

              case 3:
                results = [];
                index = 0;

              case 5:
                nextLength = (index + 1) * UPDATE_MESSAGE_ONCE_COUNT;

                if (nextLength > allMessageIds.length) {
                  nextLength = allMessageIds.length - index * UPDATE_MESSAGE_ONCE_COUNT;
                } else {
                  nextLength = UPDATE_MESSAGE_ONCE_COUNT;
                } // If there's only one message, use another api to update its status


                if (!(nextLength === 1)) {
                  _context12.next = 12;
                  break;
                }

                _context12.next = 10;
                return this._updateMessageApi(messageIds[0], status);

              case 10:
                result = _context12.sent;
                return _context12.abrupt("return", [result]);

              case 12:
                leftIds = allMessageIds.slice(index * UPDATE_MESSAGE_ONCE_COUNT, index * UPDATE_MESSAGE_ONCE_COUNT + nextLength);
                body = leftIds.map(function () {
                  return {
                    body: {
                      readStatus: status
                    }
                  };
                });
                _context12.next = 16;
                return this._batchUpdateMessagesApi(leftIds, body);

              case 16:
                responses = _context12.sent;
                responses.forEach(function (res) {
                  if (res.response().status === 200) {
                    results.push(res.json());
                  }
                });
                ownerId = this._auth.ownerId;

                if (!(allMessageIds.length > (index + 1) * UPDATE_MESSAGE_ONCE_COUNT)) {
                  _context12.next = 26;
                  break;
                }

                _context12.next = 22;
                return (0, _sleep.default)(1300);

              case 22:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context12.next = 24;
                  break;
                }

                return _context12.abrupt("return", []);

              case 24:
                _context12.next = 27;
                break;

              case 26:
                return _context12.abrupt("break", 30);

              case 27:
                index++;
                _context12.next = 5;
                break;

              case 30:
                return _context12.abrupt("return", results);

              case 31:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee11, this);
      }));

      function _updateMessagesApi(_x8, _x9) {
        return _updateMessagesApi2.apply(this, arguments);
      }

      return _updateMessagesApi;
    }()
    /**
     * Set message status to `READ`.
     *
     * @param {*} conversationId
     * @returns
     * @memberof MessageStore
     */

  }, {
    key: "readMessages",
    value: function () {
      var _readMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(conversationId) {
        return regeneratorRuntime.wrap(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this._debouncedSetConversationAsRead(conversationId);

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee12, this);
      }));

      function readMessages(_x10) {
        return _readMessages.apply(this, arguments);
      }

      return readMessages;
    }()
  }, {
    key: "_setConversationAsRead",
    value: function () {
      var _setConversationAsRead2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(conversationId) {
        var messageList, unreadMessageIds, ownerId, updatedMessages;
        return regeneratorRuntime.wrap(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                messageList = this.conversationStore[conversationId];

                if (!(!messageList || messageList.length === 0)) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt("return", null);

              case 3:
                unreadMessageIds = messageList.filter(messageHelper.messageIsUnread).map(function (m) {
                  return m.id;
                });

                if (!(unreadMessageIds.length === 0)) {
                  _context14.next = 6;
                  break;
                }

                return _context14.abrupt("return", null);

              case 6:
                _context14.prev = 6;
                ownerId = this._auth.ownerId;
                _context14.next = 10;
                return this._updateMessagesApi(unreadMessageIds, 'Read');

              case 10:
                updatedMessages = _context14.sent;

                if (!(ownerId !== this._auth.ownerId)) {
                  _context14.next = 13;
                  break;
                }

                return _context14.abrupt("return");

              case 13:
                this.store.dispatch({
                  type: this.actionTypes.updateMessages,
                  records: updatedMessages
                });
                _context14.next = 20;
                break;

              case 16:
                _context14.prev = 16;
                _context14.t0 = _context14["catch"](6);
                console.error(_context14.t0);

                this._alert.warning({
                  message: _errors.default.readFailed
                });

              case 20:
                return _context14.abrupt("return", null);

              case 21:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee13, this, [[6, 16]]);
      }));

      function _setConversationAsRead(_x11) {
        return _setConversationAsRead2.apply(this, arguments);
      }

      return _setConversationAsRead;
    }()
    /**
     * Set message status to `UNREAD`.
     *
     * @param {*} conversationId
     * @returns
     * @memberof MessageStore
     */

  }, {
    key: "unreadMessage",
    value: function () {
      var _unreadMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(messageId) {
        var message;
        return regeneratorRuntime.wrap(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                //  for track mark message
                this.store.dispatch({
                  type: this.actionTypes.markMessages
                });
                _context15.prev = 1;
                _context15.next = 4;
                return this._updateMessageApi(messageId, 'Unread');

              case 4:
                message = _context15.sent;
                this.store.dispatch({
                  type: this.actionTypes.updateMessages,
                  records: [message]
                });
                _context15.next = 12;
                break;

              case 8:
                _context15.prev = 8;
                _context15.t0 = _context15["catch"](1);
                console.error(_context15.t0);

                this._alert.warning({
                  message: _errors.default.unreadFailed
                });

              case 12:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee14, this, [[1, 8]]);
      }));

      function unreadMessage(_x12) {
        return _unreadMessage.apply(this, arguments);
      }

      return unreadMessage;
    }()
  }, {
    key: "onUnmarkMessages",
    value: function () {
      var _onUnmarkMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.markMessages
                });

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee15, this);
      }));

      function onUnmarkMessages() {
        return _onUnmarkMessages.apply(this, arguments);
      }

      return onUnmarkMessages;
    }()
  }, {
    key: "deleteConversationMessages",
    value: function () {
      var _deleteConversationMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16(conversationId) {
        var messageList, messageId;
        return regeneratorRuntime.wrap(function _callee16$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (conversationId) {
                  _context17.next = 2;
                  break;
                }

                return _context17.abrupt("return");

              case 2:
                messageList = this.conversationStore[conversationId];

                if (!(!messageList || messageList.length === 0)) {
                  _context17.next = 5;
                  break;
                }

                return _context17.abrupt("return");

              case 5:
                messageId = messageList.map(function (m) {
                  return m.id;
                }).join(',');
                _context17.prev = 6;
                _context17.next = 9;
                return this.deleteMessageApi(messageId);

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.deleteConversation,
                  conversationId: conversationId
                });
                _context17.next = 16;
                break;

              case 12:
                _context17.prev = 12;
                _context17.t0 = _context17["catch"](6);
                console.error(_context17.t0);

                this._alert.warning({
                  message: _errors.default.deleteFailed
                });

              case 16:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee16, this, [[6, 12]]);
      }));

      function deleteConversationMessages(_x13) {
        return _deleteConversationMessages.apply(this, arguments);
      }

      return deleteConversationMessages;
    }()
  }, {
    key: "deleteConversation",
    value: function () {
      var _deleteConversation = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee17(conversationId) {
        return regeneratorRuntime.wrap(function _callee17$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (conversationId) {
                  _context18.next = 2;
                  break;
                }

                return _context18.abrupt("return");

              case 2:
                _context18.prev = 2;
                _context18.next = 5;
                return this._client.account().extension().messageStore().delete({
                  conversationId: conversationId
                });

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.deleteConversation,
                  conversationId: conversationId
                });
                _context18.next = 12;
                break;

              case 8:
                _context18.prev = 8;
                _context18.t0 = _context18["catch"](2);
                console.error(_context18.t0);

                this._alert.warning({
                  message: _errors.default.deleteFailed
                });

              case 12:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee17, this, [[2, 8]]);
      }));

      function deleteConversation(_x14) {
        return _deleteConversation.apply(this, arguments);
      }

      return deleteConversation;
    }() // for track click to sms in message list

  }, {
    key: "onClickToSMS",
    value: function onClickToSMS() {
      this.store.dispatch({
        type: this.actionTypes.clickToSMS
      });
    } // for track click to call in message list

  }, {
    key: "onClickToCall",
    value: function onClickToCall(_ref10) {
      var _ref10$fromType = _ref10.fromType,
          fromType = _ref10$fromType === void 0 ? '' : _ref10$fromType;
      this.store.dispatch({
        type: this.actionTypes.clickToCall,
        fromType: fromType
      });
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "data",
    get: function get() {
      return this._storage ? this._storage.getItem(this._dataStorageKey) : this.state.data;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.data && this.data.timestamp;
    }
  }, {
    key: "timeToRetry",
    get: function get() {
      return this._timeToRetry;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this._ttl;
    }
  }, {
    key: "refreshLock",
    get: function get() {
      return this._refreshLock;
    }
  }, {
    key: "syncInfo",
    get: function get() {
      return this.data && this.data.syncInfo;
    }
  }, {
    key: "conversationStore",
    get: function get() {
      return this.data && this.data.conversationStore;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._rolesAndPermissions.hasReadMessagesPermission;
    }
  }]);

  return MessageStore;
}(_Pollable2.default), _temp), (_applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pushMessages", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "pushMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "readMessages", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "readMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadMessage", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onUnmarkMessages", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "onUnmarkMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversationMessages", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversationMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversation", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "allConversations", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.data && _this6.data.conversationList;
    }, function () {
      return _this6.conversationStore;
    }, function () {
      var conversationList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var conversationStore = arguments.length > 1 ? arguments[1] : undefined;
      return conversationList.map(function (conversationItem) {
        var messageList = conversationStore[conversationItem.id] || [];
        return _objectSpread({}, messageList[0], {
          unreadCounts: messageList.filter(messageHelper.messageIsUnread).length
        });
      });
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "textConversations", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.allConversations;
    }, function (conversations) {
      return conversations.filter(function (conversation) {
        return messageHelper.messageIsTextMessage(conversation);
      });
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "textUnreadCounts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8.textConversations;
    }, function (conversations) {
      return conversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "faxMessages", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      return _this9.allConversations;
    }, function (conversations) {
      return conversations.filter(function (conversation) {
        return messageHelper.messageIsFax(conversation);
      });
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "faxUnreadCounts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this10 = this;

    return [function () {
      return _this10.faxMessages;
    }, function (conversations) {
      return conversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "voicemailMessages", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this11 = this;

    return [function () {
      return _this11.allConversations;
    }, function (conversations) {
      return conversations.filter(function (conversation) {
        return messageHelper.messageIsVoicemail(conversation);
      });
    }];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "voiceUnreadCounts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this12 = this;

    return [function () {
      return _this12.voicemailMessages;
    }, function (conversations) {
      return conversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "unreadCounts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this13 = this;

    return [function () {
      return _this13.voiceUnreadCounts;
    }, function () {
      return _this13.textUnreadCounts;
    }, function () {
      return _this13.faxUnreadCounts;
    }, function (voiceUnreadCounts, textUnreadCounts, faxUnreadCounts) {
      var unreadCounts = 0;

      if (_this13._rolesAndPermissions.readTextPermissions) {
        unreadCounts += textUnreadCounts;
      }

      if (_this13._rolesAndPermissions.voicemailPermissions) {
        unreadCounts += voiceUnreadCounts;
      }

      if (_this13._rolesAndPermissions.readFaxPermissions) {
        unreadCounts += faxUnreadCounts;
      }

      return unreadCounts;
    }];
  }
})), _class2)) || _class);
exports.default = MessageStore;
//# sourceMappingURL=index.js.map
