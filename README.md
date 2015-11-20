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

In the future, the `rtype` library will parse rtype strings and return a predicate function for type checking.

If you're interested in using rtype to build interfaces in your standard JavaScript code, see [rfx](https://github.com/ericelliott/rfx).


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

You can use the name of any constructor available in the global scope for your types. For example `Boolean`, `Number`, `String`, `TypeError` or `DOMElement` (the latter only in browser code).

To make the signature familiar to readers, we use common JavaScript idioms such as destructuring, defaults, rest parameters and arrow functions. Prefer these over the generic `Array`, `Object` and `Function` constructors.

```js
// Bad:
(Object) => String

// Bad:
(onError: Function) => Void

// Good:
({
  count = 0: Number
}) => String

// Good:
(
  onError: (error: TypeError) => Void
) => Void

// Good:
(...args: String[]) => Number
```

Optionally, you may name the return value, similar to named parameters:

```js
(param: Type) => name: Type
```

e.g.:
```js
connect(options: Object) => connection: Object
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

### The `Any` Type

The special type `Any` means that any type is allowed:

```js
(...args: Any[]) => Array
```

### The `Void` Type

The special type `Void` should only be used to indicate that a function doesn’t return any value.

```js
element.setAttribute(name: String, value: String) => Void
```

### Union Types

Union types are denoted with the pipe symbol, `|`:

```js
(userInput: String|Number) => String|Number;
```

### Throwing functions

To indicate that a function can throw an error you can use the `throws` keyword or the `!` character.

```js
functionName! () => String

// which is equivalent to
functionName throws () => String
```

You can define the error types as well:

```js
functionName
  throws: TypeError|DOMException
  () => String
```

### Interface: User Defined Types

You can create your own types using `interface`:

```js
User, Record, Avatar, Cart
```

An interface spells out the structure of the object:

```js
interface User {
  name: String,
  avatarUrl?: Url,
  about?: String
}
```

Interfaces support object spread:

```js
interface User {
  name: String,
  avatarUrl?: Url,
  about?: String,
  ...properties?: Any
}
```


There's a shorthand for builtin literal types:

```js
interface User {
  name: /\w+/,
  description?: '',
  likes?: [],
  data?: {}
}
```

And arrow functions:

```js
interface Stamp (obj) => {
  return typeof obj === 'function' &&
    typeof obj.compose === 'function';
}
```


A one-line interface doesn't need brackets:

```js
interface Name: /\w+/
```


## References

Somewhat related ideas and inspiration sources.

* [TypeScript](http://www.typescriptlang.org/)
* [Flow](http://flowtype.org/)
* [Typed Objects](http://wiki.ecmascript.org/doku.php?id=harmony:typed_objects)
* [jsig](https://github.com/jsigbiz/spec)
