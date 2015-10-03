# Runtime rtypes

Rtypes can be checked at runtime:

```js
import check from 'rtype';

const Alpha = /[a-zA-Z]+/;

const isAlpha = check(Alpha);
isAlpha(3); // false

check(Alpha, 3); // false
```

A function can be used as an rtype, as long as it has the following signature:

```js
(Any) => Boolean
```

**Example:**

```js
const Url = rtype('Url', (url) => isUrl(url));

const User = rtype('User', {
  name: required(String),
  avatarUrl: Url,
  about: String
});
```

Additionally, any object which contains a `.test()` method can be used as an rtype, including regular expressions:

```js
const Alpha = /[a-zA-Z]+/;
```

### Inspiration

Great ideas stolen from:

* TypeScript
* React PropTypes
