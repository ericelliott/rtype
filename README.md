# rtype

Intuitive type documentation for JavaScript.

## About rtype

* A way to document function signatures and datastructures that should look familiar to any JavaScript user.


## Why?

Perhaps the most important part of API documentation is to quickly grasp the function signatures and data structures required to work with the API. There are existing standards for this stuff, including JSDoc, but in my opinion, the syntax is overly verbose, and a pain to maintain.

The TypeScript Interface is a very interesting idea, but is it possible to make it more intuitive?

I want a type syntax that is very clear to modern JavaScript developers (ES2015+).


## What is an rtype?

An rtype is a string that represents the type of a variable in JavaScript.

Functions have a `Signature` which is represented by a string.


## Reading Function Signatures

Each function is described by a **function signature**. The function signature tells you each parameter and its type, separated by a colon, and the corresponding return type:

```js
(param: Type) => ReturnType
```

To make the signature familiar to readers, we use common JavaScript idioms such as destructuring, defaults, and rest parameters:

```js
({ count = 0: Number }) => Any
(...args: String) => Any
([ firstIndex ]) => Any
```

Type names can be any builtin JavaScript type, e.g.:

```js
Boolean, Number, String, Array, Object
```


### Array Types

Arrays whose contents are all the same type are denoted with the type name inside square brackets:

```js
[ Boolean ]
```


### The `Any` Type

The special type `Any` means that any type is allowed:

```js
(...args: Any) => Array
```

### Union Types

Union types are denoted with the OR operator, `||`:

```js
(input: String || Number) => String || Number;
```

### User Defined Types

User-defined types can be any word that is not reserved:

```js
User, Record, Avatar, Cart
```

User defined types look like object literals:

```js
rtype User {
  name: String,
  avatarUrl: Url,
  about: String
}
```

By default, all values are optional. If you need to mark a field as required, you can:

```js
rtype User {
  name: required(String)
  avatarUrl: Url,
  about: String
}
```
