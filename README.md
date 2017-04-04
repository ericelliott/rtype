# Rtype

[![Join the chat at https://gitter.im/ericelliott/rtype](https://badges.gitter.im/ericelliott/rtype.svg)](https://gitter.im/ericelliott/rtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Intuitive structural type notation for JavaScript.

```js
(parameterName: Type) => ReturnType
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [About Rtype](#about-rtype)
  - [What is Rtype?](#what-is-rtype)
  - [Status: RFC](#status-rfc)
  - [Why?](#why)
  - [Why Not Just Use TypeScript?](#why-not-just-use-typescript)
- [Reading Function Signatures](#reading-function-signatures)
  - [Optional Parameters](#optional-parameters)
  - [Anonymous Parameters](#anonymous-parameters)
  - [Type Variables](#type-variables)
  - [Reserved Types](#reserved-types)
    - [Builtin Types](#builtin-types)
    - [The `Any` Type](#the-any-type)
    - [The `Void` Type](#the-void-type)
    - [The `Predicate` Type](#the-predicate-type)
    - [The `Iterable` Type](#the-iterable-type)
    - [The `TypedArray` Type](#the-typedarray-type)
  - [Literal Types](#literal-types)
  - [Tuples](#tuples)
  - [Union Types](#union-types)
  - [Constructors](#constructors)
  - [Accessor Descriptors](#accessor-descriptors)
  - [Throwing functions](#throwing-functions)
  - [Dependencies](#dependencies)
- [Interface: User Defined Types](#interface-user-defined-types)
  - [Function Interface](#function-interface)
  - [Dynamic Property Keys](#dynamic-property-keys)
  - [Predicate Literals](#predicate-literals)
- [Composing types](#composing-types)
- [Event Emitters](#event-emitters)
- [Comments](#comments)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## About Rtype

* Great for simple documentation.
* Compiler-agnostic type notation - for use with ECMAScript standard tools.
* Low learning curve for JavaScript developers.
* Can embed in JS as strings, for example with [rfx](https://github.com/ericelliott/rfx) for easy runtime reflection.
* Standing on the shoulders of giants. Inspired by: ES6, TypeScript, Haskell, Flow, & React

### What is Rtype?

Rtype is a JS-native representation of structural type interfaces with a TypeScript-inspired notation that's great for documentation.


### Status: RFC

Developer preview. [Please comment](https://github.com/ericelliott/rtype/issues/new).

Currently in-use for production library API documentation, but breaking changes are expected.

In the future, the `rtype` library will parse rtype strings and return predicate functions for runtime type checking. Static analysis tools are also [in development](https://github.com/ericelliott/rtype/issues/89). If you're interested in helping, [please contact us](https://github.com/ericelliott/rtype/issues/new?title=volunteer+for+tools).


### Why?

Perhaps the most important part of API documentation is to quickly grasp the function signatures and data structures required to work with the API. There are existing standards for this stuff, but we think we can improve on them:

* JSDoc is too verbose, not intuitive, and painful to maintain.
* TypeScript's structural types are very appealing, but opting into TypeScript's JS superset and runtime limitations is not.

We want a type representation that is very clear to modern JavaScript developers (ES2015+), that could potentially be used at runtime with simple utilities.


### Why Not Just Use TypeScript?

We want the best of all worlds:

* An intuitive way to describe interfaces for the purposes of documentation, particularly function signatures.
* Runtime accessible type reflection (even in production) with optional runtime type checks that can be disabled in production (like React.PropTypes). See [rfx](https://github.com/ericelliott/rfx#rfx).
* A way to specify types in standard ES2015+ code. Use any standard JS compiler. See [rfx](https://github.com/ericelliott/rfx#rfx).
* An easy way to generate interface documentation (like JSDoc).

TypeScript is great for compile-time and IDE features, and you could conceivably generate docs with it, but runtime features are lacking. For example, I want the ability to query function signatures inside the program at runtime, along with the ability to turn runtime type checking on and off. AFAIK, that's not possible with TypeScript (yet - there is experimental runtime support using experimental features of the ESNext `Reflect` API).



## Reading Function Signatures

Function types are described by a **function signature**. The function signature tells you each parameter and its type, separated by a colon, and the corresponding return type:

```js
(param: Type) => ReturnType
```

To make the signature familiar to readers, we use common JavaScript idioms such as destructuring, defaults, and rest parameters:

```js
(...args: [...String]) => Any
({ count = 0: Number }) => Any
```

If a parameter or property has a default value, most built-in types can be inferred:

```js
({ count = 0 }) => Any
```

If the type is a [union](#union-types) or [`Any`](#the-any-type), it must be specified:

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

### Optional Parameters

Optional parameters can be indicated with `?`:

```js
(param: Type, optParam?: Type) => ReturnType
```

Is equivalent to:

```js
(param: Type, optParam = undefined: Type) => ReturnType
```

### Anonymous Parameters

Parameter names can be omitted:

```js
is(Any) => Boolean
```

In the case of an anonymous [optional parameter](#optional-parameters) the type must be prefixed by `?:`:

```js
toggle(String, ?: Boolean) => Boolean
```

In the case of an anonymous rest parameter, simply omit the name:

```js
(...: [...Any]) => Array
```

### Type Variables

Type variables are types that do not need to be declared in advance. They may represent any type, but a single type variable may only represent one type at a time in the scope of the signature being declared.

The signature for double is usually thought of like this:

```js
double(x: Number) => Number
```

But what if we want it to accept objects as well?

```js
const one = {
  name: 'One',
  valueOf: () => 1
};

double(one); // 2
```

In that case, we'll need to change the signature to use a type variable:

```js
double(x: n) => Number
```

By convention, type variables are single letters and lowercased in order to visually distinguish them from predefined types. That way the reader doesn't need to scan back through documentation looking for a type declaration where there is no type declaration to be found.


### Reserved Types

#### Builtin Types

```js
Array, Boolean, Function, Number, Object, RegExp, String, Symbol
ArrayBuffer, Date, Error, Map, Promise, Proxy, Set, WeakMap, WeakSet
```

Note: `null` is part of `Any` and is *not* covered by `Object`.

#### The `Any` Type

The special type `Any` means that any type is allowed:

```js
(...args: [...Any]) => Array
```

#### The `Void` Type

The special type `Void` should only be used to indicate that a function returns no meaningful value (i.e., `undefined`). Since `Void` is the default return type, it can be optionally omitted. Nevertheless `Void` return types *should* usually be explicitly annotated to denote function side-effects.

```js
set(name: String, value: String) => Void
```

Is equivalent to:

```js
set(name: String, value: String)
```

#### The `Predicate` Type

The special type `Predicate` is a function with the following signature:

```js
(...args: [...Any]) => Boolean
```

#### The `Iterable` Type

Arrays, typed arrays, strings, maps and sets are iterable. Additionally any object that implements the @@iterator method can be iterated.

```js
(paramName: Iterable) => Void
```

Is equivalent to

```ts
interface IterableObject {
  [Symbol.iterator]: () => Iterator
}

interface Iterator {
  next() => {
    done: Boolean,
    value?: Any
  }
}

(paramName: IterableObject) => Void
```

#### The `TypedArray` Type

It covers these contructors: `Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `Float32Array`, `Float64Array`.

### Literal Types

Literals are also accepted as types.

```js
signatureName(param1: String, param2: 'value1' | 'value2' | 'value3') => -1 | 0 | 1
```

### Tuples

The type of arrays' elements can also be specified:

```js
// an array that contains exactly 2 elements
[Number, String]
```

For **∅ or more** and **1 or more** element(s) of the same type you can use the rest operator like so:

```js
// 0 or more
[...Number]

// 1 or more
[Number...]
//which is equivalent to
[Number, ...Number]
```

### Union Types

Union types are denoted with the pipe symbol, `|`:

```js
(userInput: String|Number) => String|Number
```

### Constructors

Constructors in JavaScript require the `new` keyword. You can identify a constructor signature using the `new` keyword as if you were demonstrating usage:

```js
new User({ username: String }) => UserInstance
```

In JavaScript, a class or constructor is not synonymous with an interface. The class or constructor definition describe the function signature to create the object instances. A separate signature is needed to describe the instances created by the function. For that, use a separate interface with a different name:

```js
interface UserInstance {
  username: String,
  credentials: String
}
```

### Accessor Descriptors

An accessor function is defined by prefixing a method with `get` or `set`.

```js
new User({ username: String }) => {
  username: String,
  get name() => String,
  set name(newName: String) // return type defaults to Void
}
```

### Throwing functions

To indicate that a function can throw an error you can use the `throws` keyword.

```js
(paramName: Type) => Type, throws: TypeError | DOMException
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

You can create your own types using the `interface` keyword.

An interface can spell out the structure of an object:

```js
interface UserProfile {
  name: String,
  avatarUrl?: Url,
  about?: String
}
```

Interfaces support builtin literal types:

```js
interface UserInstance {
  name: /\w+/,
  description?: '',
  friends?: [],
  profile?: {}
}
```

A one-line interface doesn't need brackets:

```js
interface Name: /\w+/
```

### Function Interface

A regular function signature is a shorthand for a function interface:

```js
user({ name: String, avatarUrl?: Url }) => UserInstance
```

A function interface must have a function signature:

```js
interface user {
  ({ name: String,  avatarUrl?: Url }) => UserInstance
}
```

For polymorphic functions, use multiple function signatures:

```js
interface Collection {
  (items: [...Array]) => [...Array],
  (items: [...Object]) => [...Object]
}
```

If all signatures return/emit/throw/require the same thing, you can consolidate this information in one place:

```js
interface Bar {
  (String, Object),
  (String, Boolean)
} => Void
```

Note that named function signatures in an interface block indicate methods, rather than additional function signatures:

```js
interface Collection {
  (signatureParam: Any) => Any,              // Collection() signature
  method1(items: [...Array]) => [...Array],  // method
  method2(items: [...Object]) => [...Object] // method
}
```

For convenience you can inline overloaded methods directly inside a function interface.

```js
interface Foo {
  (Type) => Type,

  a(Object) => Void,
  a(String, Number) => Void,

  b(Object) => Void,
  b(String, Number) => Void
}
```

Here is the equivalent using separate interfaces:

```js
interface a {
  (Object) => Void,
  (String, Number) => Void
}

interface b {
  (Object) => Void,
  (String, Number) => Void
}

interface Foo {
  (Type) => Type,

  a,
  b
}
```

### Dynamic Property Keys

Dynamic properties may be labeled and typed. If omitted, the type defaults to `String`.

```js
{
  [id1]: {
    skating: {time: 1000, money: 300},
    'cooking': {time: 9999, money: 999}
  },
  [id2]: {
    "jogging": {time: 300, money: 0}
  }
  // etc...
}
```

The preceding object can be expressed using these interfaces:

```ts
interface Expenditure {
  time: Number,
  money: Number
}

interface clientHobbies {
  [id: Symbol]: {
    // The following:
    [hobby]: Expenditure
    // is equivalent to
    // [hobby: String]: Expenditure
  }
}
```

### Predicate Literals

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

## Composing types

Whenever you want to compose an interface out of several others, use the spread operator for that:

```js
interface Person {
  name: Name,
  birthDate: Number
}

interface User {
  username: String,
  description?: String,
  kudos = 0: Number
}

interface HumanUser {
  ...Person,
  ...User,
  avatarUrl: String
}
```

You can also use the spread inside object type literals:

```js
interface Company {
  name: Name,
  owner: { ...Person, shareStake: Number }
}
```

In case of a name conflict, properties with same names are merged. It means all prerequisites must be satisfied. It’s fine to make types more specific through type literals:

```js
interface Creature {
  name: String,
  character: String,
  strength: (number) => (number >= 0 && number <= 100)
}

interface Human {
  ...Creature,
  name: /^(.* )?[A-Z][a-z]+$/,
  character: 'friendly' | 'grumpy'
}
```

To make sure we can run a static type check for you, we don’t allow merging two different literals. So this would result in a compile error:

```js
// Invalid!
interface Professor {
  ...Human,
  name: /^prof\. \w+$/
}
```

Obviously, merging incompatible interfaces is also invalid:

```js
// Invalid!
interface Bot {
  ...Creature,
  name: Number
}
```

## Event Emitters

When composing an observable interface, you can use the `emits` keyword to describe the events it emits:

```js
interface Channel {
  ...EventEmitter
} emits: {
  'messageAdded': (body: String, authorId: Number),
  'memberJoined': (id: Number, { name: String, email: String })
}

// this is equivalent

interface Channel {
  ...EventEmitter
} emits: {
  messageAdded(body: String, authorId: Number),
  memberJoined(id: Number, { name: String, email: String })
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
