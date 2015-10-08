# Rtype

Intuitive structural type notation for JavaScript.

> Dear JSDoc,
>
> We've had some good times.
> But it's over. I've moved on.
> 
> I've switched to Rtype.
> Now my interface docs are alive!
> 
> ~ Eric


## About Rtype

* Compiler-free type notation. 
* Standing on the shoulders of giants: ES6, TypeScript, Haskell, Flow, & React

## What is Rtype?

Rtype is a JS-native representation of structural type interfaces with a TypeScript-inspired notation that's great for documentation.


## Status: RFC

Developer preview. [Please comment](https://github.com/ericelliott/rtype/issues/new).

Breaking changes expected.


## Why?

Perhaps the most important part of API documentation is to quickly grasp the function signatures and data structures required to work with the API. There are existing standards for this stuff, but I don't like them, for various reasons.

* JSDoc is too verbose, not intuitive, and painful to maintain.
* TypeScript's structural types are very appealing, but opting into TypeScript's JS superset and runtime limitations is not.

I want a type representation that is very clear to modern JavaScript developers (ES2015+), that could potentially be used at runtime with simple utilities.


## Why Not Just Use TypeScript?

I want the best of all worlds:

* A runtime accessible type system (even in production) with optional runtime type checks (like React.PropTypes -- only in development mode).
* An easy way to generate interface documentation like JSDoc.
* An intuitive way to describe interfaces for the purposes of documentation, particularly function signatures.
* [A great way to specify types in standard ES2015+ code](https://github.com/ericelliott/rfx#rfx) for live interactive development.

TypeScript is great for compile-time and IDE features, and you could conceivably generate docs with it, but runtime features are lacking. For example, I want the ability to query function signatures inside the program at runtime, along with the ability to turn type checking on and off. AFAIK, that's not possible with TypeScript.



## Reading Function Signatures

Function types are described by a **function signature**. The function signature tells you each parameter and its type, separated by a colon, and the corresponding return type:

```js
(param: type): returnType
```

To make the signature familiar to readers, we use common JavaScript idioms such as destructuring, defaults, and rest parameters:

```js
({ count = 0: number }): any
(...args: string): any
(firstIndex[]): any
```

Optionally, you may name the return value, similar to named parameters:

```js
(param: type): name: type
```

e.g.:
```js
connect(options: object): connection: object
```

### Optional Parameters

Optional parameters can be indicated with `?`:

```js
(param: type, optParam?: type): returnType
```

### Array Types

Arrays with typed contents can be represented like this:

```js
number[]
```

### The `any` Type

The special type `any` means that any type is allowed:

```js
(...args: any): array
```


### Union Types

Union types are denoted with the pipe symbol, `|`:

```js
(userInput: string | number): string | number;
```

### Builtin Types

```js
boolean, number, string, array, object, Function
```

Here, `Function` stands in for `function` because using `function` inline with JavaScript would conflict with the `function` keyword. Using lowercase for the rest instead of using the constructor names is a convention adopted from TypeScript.

You can also describe a function's signature using a function `interface`:

```js
user({ name: string, avatarUrl?: url }): user
```

You can also use the generic `interface` syntax:

```js
interface user {
  ({ name: string,  avatarUrl?: url }): user
}
```


### Interface: User Defined Types

You can create your own types using `interface`:

```js
user, record, avatar, cart
```

An interface spells out the structure of the object:

```js
interface user {
  name: string,
  avatarUrl?: url,
  about?: string
}
```

Interfaces support object spread:

```js
interface user {
  name: string,
  avatarUrl?: url,
  about?: string,
  ...properties?: any
}
```


There's a shorthand for builtin literal types:

```js
interface user {
  name: /\w+/,
  description?: ''
  likes?: [],
  data?: {}
}
```

And arrow functions:

```js
interface stamp (obj) => {
  return typeof obj === 'function' &&
    typeof obj.compose === 'function';
}
```


A one-line interface doesn't need brackets:

```js
interface name: /\w+/
```


## Future

[Looking into the future](docs/future.md), all of this could eventually be specified inline in ES6 with no compile step:

```js
import rtype from 'rtype';

const isStamp = (obj) => {
  return typeof obj === 'function' &&
    typeof obj.compose === 'function';
};

const stamp = rtype(isStamp);

stamp({}); // false
```

## References

Somewhat related ideas and inspiration sources.

* [TypeScript](http://www.typescriptlang.org/)
* [Flow](http://flowtype.org/)
* [Typed Objects](http://wiki.ecmascript.org/doku.php?id=harmony:typed_objects)
