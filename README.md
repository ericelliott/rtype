# rtype

Intuitive type documentation for JavaScript.

## About rtype

* Compiler-free type documentation.


## Why?

Perhaps the most important part of API documentation is to quickly grasp the function signatures and data structures required to work with the API. There are existing standards for this stuff, but I don't like them, for various reasons.

* JSDoc is too verbose, not intuitive, and painful to maintain.
* TypeScript's structural types are very appealing, but currently somewhat difficult to integrate into workflows that don't have explicit support for it.

I want a type syntax that is very clear to modern JavaScript developers (ES2015+), that could potentially be used at runtime with simple utilities.


## What is an rtype?

An rtype is a string that represents the type of a variable in JavaScript.

Beyond the basic `Function` type, functions also have signatures, which are made up of parameter and return types.


## Reading Function Signatures

Each function is described by a **function signature**. The function signature tells you each parameter and its type, separated by a colon, and the corresponding return type:

```js
funtionName(param: Type): ReturnType
```

To make the signature familiar to readers, we use common JavaScript idioms such as destructuring, defaults, and rest parameters:

```js
func1({ count = 0: Number }): Any
func2(...args: String): Any
func3([ firstIndex ]): Any
```

Type names can be any builtin JavaScript type, e.g.:

```js
Boolean, Number, String, Array, Object
```


### Array Types

Arrays with typed contents can be represented like this:

```js
Number[]
```


### The `Any` Type

The special type `Any` means that any type is allowed:

```js
(...args: Any) => Array
```

### Union Types

Union types are denoted with the OR operator, `||`:

```js
(userInput: String || Number): String || Number;
```

### User Defined Types

User-defined types can be any word that is not reserved:

```js
User, Record, Avatar, Cart
```

User defined types look like object literals:

```js
User {
  name: String,
  avatarUrl: Url,
  about: String
}
```

By default, all values are optional. If you need to mark a field as required, you can:

```js
User {
  name: required(String)
  avatarUrl: Url,
  about: String
}
```


## References

Somewhat related ideas and inspiration sources.

* [TypeScript](http://www.typescriptlang.org/)
* [Flow](http://flowtype.org/)
* [Typed Objects](http://wiki.ecmascript.org/doku.php?id=harmony:typed_objects)
