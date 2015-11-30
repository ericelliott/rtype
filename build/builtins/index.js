'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVoid = exports.isString = exports.isPredicate = exports.isObject = exports.isNumber = exports.isFunction = exports.isBoolean = exports.isArray = exports.isAny = undefined;

var _is = require('is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAny = exports.isAny = function isAny() {
  return true;
};

var isArray = exports.isArray = function isArray(x) {
  return _is2.default.array(x);
};

var isBoolean = exports.isBoolean = function isBoolean(x) {
  return _is2.default.bool(x);
};

var isFunction = exports.isFunction = function isFunction(x) {
  return _is2.default.fn(x);
};

var isNumber = exports.isNumber = function isNumber(x) {
  return _is2.default.number(x);
};

var isObject = exports.isObject = function isObject(x) {
  return _is2.default.object(x);
};

var isPredicate = exports.isPredicate = function isPredicate(x) {
  if (!_is2.default.fn(x)) {
    return false;
  }
  return _is2.default.bool(x());
};

var isString = exports.isString = function isString(x) {
  return _is2.default.string(x);
};

var isVoid = exports.isVoid = function isVoid(x) {
  return _is2.default.undef(x);
};
//# sourceMappingURL=index.js.map