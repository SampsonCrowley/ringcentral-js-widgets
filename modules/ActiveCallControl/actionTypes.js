"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _Enum = _interopRequireDefault(require("../../lib/Enum"));

var _moduleActionTypes = _interopRequireDefault(require("../../enums/moduleActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getActionSet(action) {
  return [action, "".concat(action, "Success"), "".concat(action, "Error")];
}

var _default = new _Enum.default([].concat(_toConsumableArray(Object.keys(_moduleActionTypes.default)), ['updateActiveSessions', 'updateActiveSessionStatus', 'removeActiveSession', 'updateSessions', 'resetSuccess', 'setActiveSessionId', 'startRecord', 'stopRecord', 'recordFail'], _toConsumableArray(getActionSet('mute')), _toConsumableArray(getActionSet('unmute')), _toConsumableArray(getActionSet('hold')), _toConsumableArray(getActionSet('unhold')), _toConsumableArray(getActionSet('transfer')), _toConsumableArray(getActionSet('reject')), _toConsumableArray(getActionSet('hangUp')), _toConsumableArray(getActionSet('flip'))), 'activeCallControlStore');

exports.default = _default;
//# sourceMappingURL=actionTypes.js.map
