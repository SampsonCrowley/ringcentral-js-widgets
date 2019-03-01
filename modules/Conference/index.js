"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _jsonMask = _interopRequireDefault(require("json-mask"));

var _di = require("../../lib/di");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _createSimpleReducer = _interopRequireDefault(require("../../lib/createSimpleReducer"));

var _callControlError = _interopRequireDefault(require("../ActiveCallControl/callControlError"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var DEFAULT_MASK = 'phoneNumber,hostCode,participantCode,phoneNumbers(country(callingCode,id,isoCode,name),phoneNumber,location),allowJoinBeforeHost';
/**
 * @class
 * @description Conference managing module
 */

var Conference = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'Storage', 'RegionSettings', 'RolesAndPermissions', {
    dep: 'ConferenceOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(Conference, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {Client} params.client - client module instance
   */
  function Conference(_ref) {
    var _this;

    var alert = _ref.alert,
        client = _ref.client,
        regionSettings = _ref.regionSettings,
        storage = _ref.storage,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = _objectWithoutProperties(_ref, ["alert", "client", "regionSettings", "storage", "rolesAndPermissions"]);

    _classCallCheck(this, Conference);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Conference).call(this, _objectSpread({
      name: 'conference',
      client: client,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = _jsonMask.default;
                  _context.next = 3;
                  return client.account().extension().conferencing().get();

                case 3:
                  _context.t1 = _context.sent;
                  _context.t2 = DEFAULT_MASK;
                  return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2));

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      actionTypes: _actionTypes.default,
      storage: storage
    }, options)));
    _this._alert = alert;
    _this._dialInNumberStorageKey = 'conferenceDialInNumber';
    _this._additionalNumbersStorageKey = 'conferenceAdditionalNumbers';
    _this._savedStorageKey = 'conferenceSaveCurrentSettings';
    _this._regionSetting = regionSettings;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._lastCountryCode = null;

    _this._storage.registerReducer({
      key: _this._dialInNumberStorageKey,
      reducer: (0, _createSimpleReducer.default)(_this.actionTypes.updateDialInNumber, 'dialInNumber')
    });

    _this._storage.registerReducer({
      key: _this._additionalNumbersStorageKey,
      reducer: (0, _createSimpleReducer.default)(_this.actionTypes.updateAdditionalNumbers, 'additionalNumbers')
    });

    _this._storage.registerReducer({
      key: _this._savedStorageKey,
      reducer: (0, _createSimpleReducer.default)(_this.actionTypes.updateSaveCurrentSettings, '_saved')
    });

    return _this;
  }

  _createClass(Conference, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var matchedPhoneNumber;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _get(_getPrototypeOf(Conference.prototype), "_onStateChange", this).call(this);

                if (!(!this.data || !this._regionSetting.ready || this._lastCountryCode === this._regionSetting.countryCode)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                this._lastCountryCode = this._regionSetting.countryCode;
                matchedPhoneNumber = this.data.phoneNumbers.find(function (e) {
                  return e.country.isoCode === _this2._lastCountryCode;
                });

                if (matchedPhoneNumber && matchedPhoneNumber.phoneNumber !== this.dialInNumber) {
                  this.updateDialInNumber(matchedPhoneNumber.phoneNumber);
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return _get(_getPrototypeOf(Conference.prototype), "_shouldInit", this).call(this) && this._rolesAndPermissions.ready && this._alert.ready;
    }
  }, {
    key: "updateEnableJoinBeforeHost",
    value: function () {
      var _updateEnableJoinBeforeHost = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(allowJoinBeforeHost) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._client.account().extension().conferencing().put({
                  allowJoinBeforeHost: allowJoinBeforeHost
                });

              case 3:
                data = _context3.sent;

                this._store.dispatch({
                  type: this.actionTypes.fetchSuccess,
                  data: data
                });

                return _context3.abrupt("return", data);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);

                this._alert.warning({
                  message: _callControlError.default.generalError
                });

                return _context3.abrupt("return", null);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function updateEnableJoinBeforeHost(_x) {
        return _updateEnableJoinBeforeHost.apply(this, arguments);
      }

      return updateEnableJoinBeforeHost;
    }()
  }, {
    key: "updateDialInNumber",
    value: function updateDialInNumber(dialInNumber) {
      this._store.dispatch({
        type: this.actionTypes.updateDialInNumber,
        dialInNumber: dialInNumber
      });
    }
  }, {
    key: "updateAdditionalNumbers",
    value: function updateAdditionalNumbers(additionalNumbers) {
      this._store.dispatch({
        type: this.actionTypes.updateAdditionalNumbers,
        additionalNumbers: additionalNumbers
      });
    }
  }, {
    key: "updateSaveCurrentSettings",
    value: function updateSaveCurrentSettings(_saved) {
      this._store.dispatch({
        type: this.actionTypes.updateSaveCurrentSettings,
        _saved: _saved
      });
    } // for track invite with text

  }, {
    key: "onInviteWithText",
    value: function onInviteWithText() {
      this.store.dispatch({
        type: this.actionTypes.inviteWithText
      });
    } // for track join as host

  }, {
    key: "onJoinAsHost",
    value: function onJoinAsHost() {
      this.store.dispatch({
        type: this.actionTypes.joinAsHost
      });
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch() {
      return !this._tabManager || this._tabManager.active;
    }
  }, {
    key: "additionalNumbers",
    get: function get() {
      return this._storage.getItem(this._additionalNumbersStorageKey) || [];
    }
  }, {
    key: "_saved",
    get: function get() {
      return this._storage.getItem(this._savedStorageKey) || false;
    }
  }, {
    key: "dialInNumber",
    get: function get() {
      return this._storage.getItem(this._dialInNumberStorageKey) || this.data && this.data.phoneNumber;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.OrganizeConference;
    }
  }]);

  return Conference;
}(_DataFetcher2.default), (_applyDecoratedDescriptor(_class2.prototype, "updateEnableJoinBeforeHost", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "updateEnableJoinBeforeHost"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDialInNumber", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDialInNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateAdditionalNumbers", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "updateAdditionalNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSaveCurrentSettings", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSaveCurrentSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onInviteWithText", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "onInviteWithText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onJoinAsHost", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "onJoinAsHost"), _class2.prototype)), _class2)) || _class);
exports.default = Conference;
//# sourceMappingURL=index.js.map
