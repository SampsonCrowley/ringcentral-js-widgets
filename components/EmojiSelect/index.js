"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EmojiSelect;

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactEmojione = _interopRequireDefault(require("react-emojione"));

var _emojione = _interopRequireDefault(require("../../assets/images/emojione.png"));

var _emojis = _interopRequireDefault(require("./emojis.json"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EmojiSelect(_ref) {
  var onSelect = _ref.onSelect,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.root, className)
  }, _emojis.default.map(function (emoji) {
    var emojsStr = ":".concat(emoji, ":");
    return _react.default.createElement("span", {
      key: emoji,
      className: _styles.default.emoji,
      onClick: function onClick() {
        return onSelect(emojsStr);
      }
    }, _react.default.createElement(_reactEmojione.default, {
      style: {
        width: 25,
        height: 25,
        backgroundImage: "url(\"".concat(_emojione.default, "\")")
      }
    }, emojsStr));
  }));
}

EmojiSelect.propTypes = {
  onSelect: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
};
EmojiSelect.defaultProps = {
  className: undefined
};
//# sourceMappingURL=index.js.map
