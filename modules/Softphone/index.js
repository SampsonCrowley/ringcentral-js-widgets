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

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getSoftphoneReducer = _interopRequireDefault(require("./getSoftphoneReducer"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var Softphone = (
/**
 * @class
 * @description Softphone module to call softphone
 */
_dec = (0, _di.Module)({
  deps: ['Brand', {
    dep: 'SoftphoneOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Softphone, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Brnad} params.brand - brand module instance
   * @param {Bool} params.extensionMode - default false
   */
  function Softphone(_ref) {
    var _this;

    var brand = _ref.brand,
        _ref$extensionMode = _ref.extensionMode,
        extensionMode = _ref$extensionMode === void 0 ? false : _ref$extensionMode,
        _ref$callHandler = _ref.callHandler,
        callHandler = _ref$callHandler === void 0 ? null : _ref$callHandler,
        options = _objectWithoutProperties(_ref, ["brand", "extensionMode", "callHandler"]);

    _classCallCheck(this, Softphone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Softphone).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes.default
    })));
    _this._brand = brand;
    _this._extensionMode = extensionMode;
    _this._callHandler = callHandler;
    _this._reducer = (0, _getSoftphoneReducer.default)(_this.actionTypes);
    return _this;
  }

  _createClass(Softphone, [{
    key: "_onStateChange",
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(phoneNumber) {
        var cmd, uri, frame;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.startToConnect,
                  phoneNumber: phoneNumber
                });
                cmd = "call?number=".concat(encodeURIComponent(phoneNumber));
                uri = "".concat(this.protocol, "://").concat(cmd);

                if (!this._callHandler) {
                  _context.next = 7;
                  break;
                }

                this._callHandler({
                  protocol: this.protocol,
                  command: cmd
                });

                _context.next = 28;
                break;

              case 7:
                if (!this._extensionMode) {
                  _context.next = 11;
                  break;
                }

                // TODO use window.open in extension background, this method will crash chrome when
                // executed in background page.
                window.open(uri);
                _context.next = 28;
                break;

              case 11:
                if (!window.navigator.msLaunchUri) {
                  _context.next = 15;
                  break;
                }

                // to support ie to start the service
                window.navigator.msLaunchUri(uri);
                _context.next = 28;
                break;

              case 15:
                if (!(window.ActiveXObject || 'ActiveXObject' in window)) {
                  _context.next = 19;
                  break;
                }

                // to support ie on Windows < 8
                window.open(uri);
                _context.next = 28;
                break;

              case 19:
                frame = document.createElement('iframe');
                frame.style.display = 'none';
                document.body.appendChild(frame);
                _context.next = 24;
                return (0, _sleep.default)(100);

              case 24:
                frame.contentWindow.location.href = uri;
                _context.next = 27;
                return (0, _sleep.default)(300);

              case 27:
                document.body.removeChild(frame);

              case 28:
                this.store.dispatch({
                  type: this.actionTypes.connectComplete
                });

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function makeCall(_x) {
        return _makeCall.apply(this, arguments);
      }

      return makeCall;
    }() // eslint-disable-next-line class-methods-use-this

  }, {
    key: "protocol",
    get: function get() {
      switch (this._brand.id) {
        case '3420':
          // ATT
          return 'attvr20';

        case '7710':
          // BT
          return 'rcbtmobile';

        case '7310':
          // TELUS
          return 'rctelus';

        default:
          return 'rcmobile';
      }
    }
  }, {
    key: "status",
    get: function get() {
      return _moduleStatuses.default.ready;
    }
  }, {
    key: "connectingPhoneNumber",
    get: function get() {
      return this.state.connectingPhoneNumber;
    }
  }, {
    key: "softphoneStatus",
    get: function get() {
      return this.state.softphoneStatus;
    }
  }]);

  return Softphone;
}(_RcModule2.default), (_applyDecoratedDescriptor(_class2.prototype, "makeCall", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype)), _class2)) || _class);
exports.default = Softphone;
//# sourceMappingURL=index.js.map
