# Runtime rtypes

Rtypes can be checked at runtime:

```js
import { rtype, check } from 'rtype';

const alpha = rtype(/[a-zA-Z]+/);

alpha(3); // false
check(alpha, 3); // false
```

Any object which contains a `.test()` method (like regular expressions) can be used as an rtype.

A function can be used as an rtype, as long as it has the following signature:

```js
(any): boolean
```

**Example:**

```js
import { rtype, string } from 'rtype';
import isUrl from './utils/is-url';

const url = rtype(isUrl);

const user = rtype({
  name: string,
  avatarUrl?: url,
  about?: string
});
```
