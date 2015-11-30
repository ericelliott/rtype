import test from 'tape';

import rtype from '../source';

test('rtype(type: Predicate | String) => Predicate', (t) => {
  t.equal(typeof rtype, 'function', 'is a function');
  t.ok(rtype('(type: Predicate | String) => Predicate'), 'rtype(String) => true');

  const myPredicate = () => true;
  t.equal(rtype(myPredicate), myPredicate, 'rtype(Predicate) => Predicate');

  const myFunc = () => {};
  t.throws(() => {
    rtype(myFunc);
  }, TypeError, 'throws for non-Predicate Function');

  t.end();
});

import './builtins';
