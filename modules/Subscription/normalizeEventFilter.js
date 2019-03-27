"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeEventFilter = normalizeEventFilter;

require("core-js/modules/es6.regexp.replace");

var apiUrlPrefixRegex = /^\/restapi\/v[\d]\.[\d]/;
var accountRegex = /\/account\/[\d]+/;
var extensionRegex = /\/extension\/[\d]+/;
var totalActiveCallsRegex = /&totalActiveCalls/;
/**
 * @description Convert the subscription filters from base subscription object
 *  to the generic event filters we use to subscribe
 * @param {String[]} filters
 * @returns {String[]} normalizedFilters
 */

function normalizeEventFilter() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return filter.replace(apiUrlPrefixRegex, '').replace(accountRegex, '/account/~').replace(extensionRegex, '/extension/~').replace(totalActiveCallsRegex, '');
}
//# sourceMappingURL=normalizeEventFilter.js.map
