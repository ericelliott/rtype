import test from 'tape';

import {
  isAny, isArray, isBoolean, isFunction, isNumber, isObject, isPredicate, isString, isVoid
} from '../../source';

test('isAny', t => {
  t.ok(isAny(), 'permissively accepts no arguments');
  t.ok(isAny('abc'), 'accepts any value');

  t.end();
});

[
  { type: 'Array', fn: isArray, example: ['abc'], nonExample: 1 },
  { type: 'Boolean', fn: isBoolean, example: true, nonExample: 1 },
  { type: 'Function', fn: isFunction, example: () => {}, nonExample: 1 },
  { type: 'Number', fn: isNumber, example: 1, nonExample: true },
  { type: 'Object', fn: isObject, example: {}, nonExample: 1 },
  { type: 'Predicate', fn: isPredicate, example: (x) => !!x, nonExample: () => 1 },
  { type: 'String', fn: isString, example: 'abc', nonExample: 1 }
].forEach(({ type, fn, example, nonExample }) => {

  test(fn.name, t => {
    t.ok(fn(example), `accepts an ${type} value`);

    t.notOk(fn(), 'rejects lack of arguments');
    t.notOk(fn(nonExample), `rejects non-${type} value`);

    t.end();
  });

});

test('isVoid', t => {
  t.ok(isVoid(), 'accepts no arguments');
  t.ok(isVoid(undefined), 'accepts an undefined value');

  t.notOk(isVoid('abc'), `rejects non-undefined value`);

  t.end();
});
