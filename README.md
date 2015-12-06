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

```js
(param: Type) => ReturnType
```

This repository is for the notation documentation and parser.

If you're interested in using rtype to build interfaces in your standard JavaScript code, see [rfx](https://github.com/ericelliott/rfx).


## About Rtype

* Great for simple documentation.
* Compiler-free type notation - for use with ECMAScript standard tools.
* Should embed in JS as strings, not comments. Affords easy runtime reflection.
* Standing on the shoulders of giants: ES6, TypeScript, Haskell, Flow, & React

## What is Rtype?

Rtype is a JS-native representation of structural type interfaces with a TypeScript-inspired notation that's great for documentation.


## Status: RFC

Developer preview. [Please comment](https://github.com/ericelliott/rtype/issues/new).

Breaking changes expected.

In the future, the `rtype` library will parse rtype strings and return a predicate function for type checking.


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
* A JS-native solution so I can use whatever ES-compatible transpiler I want (e.g., Babel)

TypeScript is great for compile-time and IDE features, and you could conceivably generate docs with it, but runtime features are lacking. For example, I want the ability to query function signatures inside the program at runtime, along with the ability to turn type checking on and off. AFAIK, that's not possible with TypeScript (yet - there is experimental runtime support using experimental features of the ES7+ `Reflect` API).



## Reading Function Signatures

Function types are described by a **function signature**. The function signature tells you each parameter and its type, separated by a colon, and the corresponding return type:

```js
(param: Type) => ReturnType
```

To make the signature familiar to readers, we use common JavaScript idioms such as destructuring, defaults, and rest parameters:

```js
(...args: String[]) => Any
(myArray: []) => Any
({ count = 0: Number }) => Any
```

If a parameter has a default value, most built-in types can be inferred:

```js
({ count = 0 }) => Any
```

If the type is a [union](#union-types) or [`Any`](#the-any-type), it needs to be specified:

```js
({ collection = []: Array | Object }) => Any
```

Optionally, you may name the return value, similar to named parameters:

```js
(param: Type) => name: Type
```

Or even name a signature to reuse it later on:

```js
connect(options: Object) => connection: Object
```

You can also omit the name of a parameter if need be:

```js
is(Any) => Boolean
```

### Optional Parameters

Optional parameters can be indicated with `?`:

```js
(param: Type, optParam?: Type) => ReturnType
```

### Array Types

Arrays with typed contents can be represented like this:

```js
Number[]
```


### Union Types

Union types are denoted with the pipe symbol, `|`:

```js
(userInput: String|Number) => String|Number
```

### Literal Types

Literals are also accepted as types.

```js
signatureName(param1: String, param2: 'value1' | 'value2' | 'value3') => -1 | 0 | 1
```

### Builtin Types

```js
Any, Array, Boolean, Function, Number, Object, String, Void, Predicate
```

Many builtin types are named after JavaScript constructors. Many syntax highlighters will make the types stand out when the signature is rendered in the docs.

#### The `Any` Type

The special type `Any` means that any type is allowed:

```js
(...args: Any[]) => Array
```

#### The `Void` Type

The special type `Void` should only be used to indicate that a function returns nothing (i.e., `undefined`).

```js
set(name: String, value: String) => Void
```

#### The `Predicate` Type

The special type `Predicate` is a function with the following signature:

```js
(...args: Any[]) => Boolean
```

### Throwing functions

To indicate that a function can throw an error you can use the `throws` keyword.

```js
(paramName: Type) => Type, throws: TypeError|DOMException
```

For the generic `Error` type, you can optionally omit the throw type:

```js
(paramName: Type) => Type, throws
```

Is equivalent to:

```js
(paramName: Type) => Type, throws: Error
```


### Dependencies

You can optionally list your functions' dependencies. In the future, add-on tools may automatically scan your functions and list dependencies for you, which could be useful for documentation and to identify polyfill requirements.

```js
// one dependency
signatureName() => Type, requires: functionA

// several dependencies
signatureName()
  => Type,
  requires: functionA, functionB
```


## Interface: User Defined Types

You can create your own types using `interface`:

```js
User, Record, Avatar, Cart
```

An interface can spell out the structure of the object:

```js
interface User {
  name: String,
  avatarUrl?: Url,
  about?: String
}
```


A regular function signature is shorthand for a function interface:

```js
user({ name: String, avatarUrl?: Url }) => User
```

A function interface must have a function signature:

```js
interface User {
  ({ name: String,  avatarUrl?: Url }) => User
}
```

For polymorphic functions, use multiple function signatures:

```js
interface Collection {
  (items: Array[]) => Array[],
  (items: Object[]) => Object[]
}
```

Note that named function signatures in an interface block indicate methods, rather than additional function signatures:

```js
interface Collection {
  (signatureParam: Any) => Any, // Collection() signature
  method1(items: Array[]) => Array[], // method
  method2(items: Object[]) => Object[] // method
}

// in JS:
// typeof Collection === 'function'
// typeof Collection.method1 === 'function'
// typeof Collection.method2 === 'function'
```


Interfaces support object spread:

```js
interface User {
  name: String,
  avatarUrl?: Url,
  about?: String,
  ...properties? // type Object is inferred
}
```


Interfaces support builtin literal types:

```js
interface User {
  name: /\w+/,
  description?: '',
  likes?: [],
  data?: {}
}
```

A one-line interface doesn't need brackets:

```js
interface Name: /\w+/
```


Interfaces may use predicate literals, terminated by a semicolon:

```js
interface Integer (number) => number === parseInt(number, 10);
```

You can combine predicate literals with interface blocks. Semicolon disambiguates:

```js
interface EnhancedInteger (number) => number === parseInt(number, 10); {
  isDivisibleBy3() => Boolean,
  double() => Number
}
```

Multi-line example:

```js
interface EnhancedInteger (number) => {
  return number === parseInt(number, 10);
}; {
  isDivisibleBy3() => Boolean,
  double() => Number
}
```


## Comments

Standard JS comment syntax applies, e.g.:

```js
// A single-line comment, can appear at the end of a line.

/*
  A multi-line comment.
  Can span many lines.
*/
```

## References

Somewhat related ideas and inspiration sources.

* [TypeScript](http://www.typescriptlang.org/)
* [Flow](http://flowtype.org/)
* [Typed Objects](http://wiki.ecmascript.org/doku.php?id=harmony:typed_objects)
* [jsig](https://github.com/jsigbiz/spec)
