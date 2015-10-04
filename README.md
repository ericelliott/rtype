# rtype

Intuitive type notation for JavaScript.

## About rtype

* Compiler-free type notation.
* Standing on the shoulders of giants: ES6, TypeScript, Haskell, Flow, & React


## Status

Developer preview. Breaking changes expected.


## Why?

Perhaps the most important part of API documentation is to quickly grasp the function signatures and data structures required to work with the API. There are existing standards for this stuff, but I don't like them, for various reasons.

* JSDoc is too verbose, not intuitive, and painful to maintain.
* TypeScript's structural types are very appealing, but currently somewhat difficult to integrate into workflows that don't have explicit support for it.

I want a type syntax that is very clear to modern JavaScript developers (ES2015+), that could potentially be used at runtime with simple utilities.


## What is an rtype?

An rtype is a string that represents the type of a variable in JavaScript.


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

### Optional Parameters

Optional parameters can be indicated with `?`:

```js
User({ name: string, avatarUrl? }): User
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

Union types are denoted with the OR operator, `||`:

```js
(userInput: string || number): string || number;
```

### Builtin Types

```js
boolean, number, string, array, object, func
```

Here, `func` stands in for `function` because `function` is a reserved word.

You can instead describe a function's signature using a function `interface`:

```js
User({ name: string, avatarUrl? }): user
```

You can also use the generic `interface` syntax:

```js
interface User {
  ({ name: string,  avatarUrl? }): User
}
```


### Interface: User Defined Types

You can create your own types using `interface`:

```js
User, Record, Avatar, Cart
```

An interface spells out the structure of the object:

```js
interface user {
  name: string,
  avatarUrl?: url,
  about?: string
}
```

By default, all values are required.


There's a shorthand for type literal forms:

```js
interface user {
  name: /\w+/,
  description?: ''
  likes?: [],
  data?: {}
}
```

A one-line interface doesn't need brackets:

```js
interface name: /\w+/
```

And arrow functions:

```js
interface stamp (obj) => {
  return typeof obj === 'function' &&
    typeof obj.compose === 'function';
}
```

Looking into the future, all of this could eventually be specified inline in ES6 with no compile step:

```js
import rtype from 'rtype';

const isStamp = (obj) => {
  return typeof obj === 'function' &&
    typeof obj.compose === 'function';
};

const Stamp = rtype`interface stamp ${ isStamp }`;
```

## References

Somewhat related ideas and inspiration sources.

* [TypeScript](http://www.typescriptlang.org/)
* [Flow](http://flowtype.org/)
* [Typed Objects](http://wiki.ecmascript.org/doku.php?id=harmony:typed_objects)
