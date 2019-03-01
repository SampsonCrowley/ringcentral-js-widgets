"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentLocaleReducer = getCurrentLocaleReducer;
exports.getToggleDebugMode = getToggleDebugMode;
exports.getProxyLocaleReducer = getProxyLocaleReducer;

function getCurrentLocaleReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        locale = _ref.locale;

    if (type === types.setLocaleSuccess) return locale;
    return state;
  };
}

function getToggleDebugMode(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        debugMode = _ref2.debugMode;

    if (type === types.toggleDebugMode) return !debugMode;
    return state;
  };
}

function getProxyLocaleReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        locale = _ref3.locale;

    if (type === types.syncProxyLocale) return locale;
    return state;
  };
}
//# sourceMappingURL=reducers.js.map
