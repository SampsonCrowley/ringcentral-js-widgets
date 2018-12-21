'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _phoneTypes$extension;

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _dndStatus = require('ringcentral-integration/modules/Presence/dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

var _phoneTypes = require('../../../enums/phoneTypes');

var _phoneTypes2 = _interopRequireDefault(_phoneTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_phoneTypes$extension = {}, (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.extension, "Durchw."), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.direct, "Direkt"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.mobile, "Mobile"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.home, "Home"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.business, "Geschäftlich"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.fax, "Fax"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.other, "Andere"), (0, _defineProperty3.default)(_phoneTypes$extension, 'emailLabel', "E-Mail"), (0, _defineProperty3.default)(_phoneTypes$extension, 'call', "Anruf"), (0, _defineProperty3.default)(_phoneTypes$extension, 'text', "Textn."), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.available, "Verfügbar"), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.offline, "Unsichtbar"), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.busy, "Belegt"), (0, _defineProperty3.default)(_phoneTypes$extension, _dndStatus2.default.doNotAcceptAnyCalls, "Nicht stören"), (0, _defineProperty3.default)(_phoneTypes$extension, 'notActivated', "Inaktiv"), _phoneTypes$extension);

// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home"@#@
// @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@
//# sourceMappingURL=de-DE.js.map
