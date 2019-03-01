"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;
exports.copy = copy;
exports.compile = compile;
exports.releaseClean = releaseClean;
exports.releaseCopy = releaseCopy;
exports.generatePackage = generatePackage;
exports.exportLocale = exportLocale;
exports.exportFullLocale = exportFullLocale;
exports.exportTranslatedLocale = exportTranslatedLocale;
exports.importLocale = importLocale;
exports.consolidateLocale = consolidateLocale;
exports.release = exports.build = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

var _gulp = _interopRequireDefault(require("gulp"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _gulpBabel = _interopRequireDefault(require("gulp-babel"));

var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));

var _execa = _interopRequireDefault(require("execa"));

var localeLoader = _interopRequireWildcard(require("@ringcentral-integration/locale-loader"));

var _localeSettings = _interopRequireDefault(require("@ringcentral-integration/locale-settings"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getVersionFromTag() {
  return _getVersionFromTag.apply(this, arguments);
}

function _getVersionFromTag() {
  _getVersionFromTag = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var tag;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tag = process.env.TRAVIS_TAG;

            if (!(tag && /^\d+.\d+.\d+/.test(tag))) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", tag);

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _execa.default.shell('git describe --exact-match --tags $(git rev-parse HEAD)');

          case 6:
            tag = _context.sent;
            tag = tag.replace(/\r?\n|\r/g, '');

            if (!/^\d+.\d+.\d+/.test(tag)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", tag);

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0);

          case 15:
            return _context.abrupt("return", null);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));
  return _getVersionFromTag.apply(this, arguments);
}

var BUILD_PATH = _path.default.resolve(__dirname, '../../build/glip-widgets');

function clean() {
  return _fsExtra.default.remove(BUILD_PATH);
}

function copy() {
  return _gulp.default.src(['./**', '!./**/*.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!package-lock.json']).pipe(_gulp.default.dest(BUILD_PATH));
}

function compile() {
  return _gulp.default.src(['./**/*.js', '!./**/*.test.js', '!./coverage{/**,}', '!./node_modules{/**,}', '!gulpfile.babel.js']).pipe(localeLoader.transformLoader(_objectSpread({}, _localeSettings.default))).pipe(_gulpSourcemaps.default.init()).pipe((0, _gulpBabel.default)()).pipe(_gulpSourcemaps.default.write('.')).pipe(_gulp.default.dest(BUILD_PATH));
}

var build = _gulp.default.series(clean, _gulp.default.parallel(copy, compile));

exports.build = build;

var RELEASE_PATH = _path.default.resolve(__dirname, '../../release/glip-widgets');

function releaseClean() {
  return _releaseClean.apply(this, arguments);
}

function _releaseClean() {
  _releaseClean = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _fsExtra.default.exists(RELEASE_PATH);

          case 2:
            if (_context2.sent) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return _execa.default.shell("mkdir -p ".concat(RELEASE_PATH));

          case 5:
            _context2.next = 7;
            return _fsExtra.default.readdir(RELEASE_PATH);

          case 7:
            _context2.t0 = function (file) {
              return !/^\./.test(file);
            };

            files = _context2.sent.filter(_context2.t0);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 12;
            _iterator = files[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 21;
              break;
            }

            file = _step.value;
            _context2.next = 18;
            return _fsExtra.default.remove(_path.default.resolve(RELEASE_PATH, file));

          case 18:
            _iteratorNormalCompletion = true;
            _context2.next = 14;
            break;

          case 21:
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t1 = _context2["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 27:
            _context2.prev = 27;
            _context2.prev = 28;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 30:
            _context2.prev = 30;

            if (!_didIteratorError) {
              _context2.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context2.finish(30);

          case 34:
            return _context2.finish(27);

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[12, 23, 27, 35], [28,, 30, 34]]);
  }));
  return _releaseClean.apply(this, arguments);
}

function releaseCopy() {
  return _gulp.default.src(["".concat(BUILD_PATH, "/**"), "".concat(__dirname, "/README.md"), "".concat(__dirname, "/LICENSE")]).pipe(_gulp.default.dest(RELEASE_PATH));
}

function generatePackage() {
  return _generatePackage.apply(this, arguments);
}

function _generatePackage() {
  _generatePackage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var packageInfo, version;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = JSON;
            _context3.next = 3;
            return _fsExtra.default.readFile(_path.default.resolve(BUILD_PATH, 'package.json'));

          case 3:
            _context3.t1 = _context3.sent;
            packageInfo = _context3.t0.parse.call(_context3.t0, _context3.t1);
            delete packageInfo.scripts;
            delete packageInfo.jest;
            _context3.next = 9;
            return getVersionFromTag();

          case 9:
            version = _context3.sent;
            console.log('version:', version);

            if (version) {
              packageInfo.version = version;
              packageInfo.name = 'ringcentral-widgets';
            }

            _context3.next = 14;
            return _fsExtra.default.writeFile(_path.default.resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _generatePackage.apply(this, arguments);
}

var release = _gulp.default.series(_gulp.default.parallel(build, releaseClean), _gulp.default.parallel(releaseCopy, generatePackage));

exports.release = release;

function exportLocale() {
  return localeLoader.exportLocale(_objectSpread({}, _localeSettings.default));
}

function exportFullLocale() {
  return localeLoader.exportLocale(_objectSpread({}, _localeSettings.default, {
    exportType: 'full'
  }));
}

function exportTranslatedLocale() {
  return localeLoader.exportLocale(_objectSpread({}, _localeSettings.default, {
    exportType: 'translated'
  }));
}

function importLocale() {
  return localeLoader.importLocale(_objectSpread({}, _localeSettings.default));
}

function consolidateLocale() {
  return localeLoader.consolidateLocale(_objectSpread({}, _localeSettings.default, {
    sourceFolder: _path.default.resolve(__dirname, 'lib/countryNames')
  }));
}
//# sourceMappingURL=gulpfile.js.map
