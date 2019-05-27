"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatLocale;

require("core-js/modules/es6.regexp.split");

/**
 * @function
 * @description Format the input locale name
 * @param {String} locale
 * @returns {String}
 */
function formatLocale(locale) {
  var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var tokens = locale.split(/[-_]/);
  tokens[0] = tokens[0].toLowerCase();

  if (tokens.length > 1) {
    tokens[tokens.length - 1] = tokens[tokens.length - 1].toUpperCase();
  }

  if (tokens.length > 2) {
    tokens[1] = "".concat(tokens[1][0].toUpperCase()).concat(tokens[1].substring(1).toLowerCase());
  }

  return tokens.join(delimeter);
}
//# sourceMappingURL=index.js.map
