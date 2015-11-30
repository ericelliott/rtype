'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./builtins/index');

var _loop = function _loop(_key2) {
  if (_key2 === "default") return 'continue';
  Object.defineProperty(exports, _key2, {
    enumerable: true,
    get: function get() {
      return _index[_key2];
    }
  });
};

for (var _key2 in _index) {
  var _ret = _loop(_key2);

  if (_ret === 'continue') continue;
}

var rtype = function rtype(type) {
  if ((0, _index.isString)(type)) {
    console.warn('Warning rtype string parsing is not implemented yet');
    return true;
  }
  if ((0, _index.isPredicate)(type)) {
    return type;
  }
  throw new TypeError('rtype(type: Predicate | String) => Predicate');
};

exports.default = rtype;
//# sourceMappingURL=index.js.map