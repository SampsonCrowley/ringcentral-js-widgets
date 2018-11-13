'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToFunctions = exports.mapToProps = undefined;

var _reactRedux = require('react-redux');

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _TransferPanel = require('../../components/TransferPanel');

var _TransferPanel2 = _interopRequireDefault(_TransferPanel);

var _phoneContext = require('../../lib/phoneContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      activeCallControl = _ref$phone.activeCallControl,
      webphone = _ref$phone.webphone,
      contactSearch = _ref$phone.contactSearch,
      _ref$params = _ref.params,
      sessionId = _ref$params.sessionId,
      _ref$params$type = _ref$params.type,
      type = _ref$params$type === undefined ? 'active' : _ref$params$type;

  var session = null;
  if (type === 'active' && activeCallControl) {
    session = activeCallControl.activeSession;
  } else if (type === 'webphone' && webphone) {
    session = webphone.sessions.find(function (session) {
      return session.id === sessionId;
    });
  }

  return {
    sessionId: sessionId,
    currentLocale: locale.currentLocale,
    searchContactList: contactSearch && contactSearch.sortedResult,
    session: session
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      regionSettings = _ref2$phone.regionSettings,
      routerInteraction = _ref2$phone.routerInteraction,
      activeCallControl = _ref2$phone.activeCallControl,
      webphone = _ref2$phone.webphone,
      contactSearch = _ref2$phone.contactSearch,
      _ref2$params$type = _ref2.params.type,
      type = _ref2$params$type === undefined ? 'active' : _ref2$params$type,
      phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
      recipientsContactInfoRenderer = _ref2.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref2.recipientsContactPhoneRenderer,
      phoneTypeRenderer = _ref2.phoneTypeRenderer;

  return {
    setActiveSessionId: function setActiveSessionId(sessionId) {
      if (type === 'active' && activeCallControl) {
        activeCallControl.setActiveSessionId(sessionId);
      }
    },
    onTransfer: function onTransfer(transferNumber, sessionId) {
      if (type === 'active' && activeCallControl) {
        activeCallControl.transfer(transferNumber, sessionId);
      } else if (type === 'webphone' && webphone) {
        webphone.transfer(transferNumber, sessionId);
      }
    },
    onBack: function onBack() {
      routerInteraction.goBack();
    },
    onCallEnd: function onCallEnd() {
      if (type === 'active') {
        routerInteraction.replace('/calls');
      } else {
        routerInteraction.replace('/dialer');
      }
    },

    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    searchContact: function searchContact(searchString) {
      if (contactSearch) {
        contactSearch.debouncedSearch({ searchString: searchString });
      }
    },

    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    recipientsContactInfoRenderer: recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer: recipientsContactPhoneRenderer
  };
}

var TransferPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_TransferPanel2.default));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = TransferPage;
//# sourceMappingURL=index.js.map
