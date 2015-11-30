import test from 'tape';

import rtype from '../source';

test('exports a function', (t) => {
  t.equal(typeof rtype, 'function');

  t.end();
});
