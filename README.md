# rtype

Runtime accessible, gradual, structural types for JavaScript

## About rtype

rtype is two things:
* A way to document function signatures that should look familiar to any JavaScript user.
* A way to check types at runtime.


## Why?

rtype exists for two purposes:

* Clearer documentation for JavaScript APIs
* Runtime accessible type checking

There are lots of great type tools out there now, but I'm not satisfied with any of them. TypeScript is a compile-to-JavaScript superset of JS that is only very useful at compile time, but there are some great uses for types at runtime as well.

For instance, in dataflow programming, it's common to have many components that can connect to each other's inputs and outputs dynamically. It would be very interesting to be able to query a component for its interface at runtime so that you can determine which components are compatible with each other.

This has applications in dataflow programming, but it can also be useful for live (aka hot loading) debuggers or software with integrated IDEs (e.g., many game engines include integrated game editors).


## What is an rtype?

An rtype is a string that represents the type of a variable in JavaScript.

Functions have two types:

* Function
* a special type known as a `signature` which is represented by a string


## Reading Function Signatures

Each function is described by a **function signature**. The function signature tells you each parameter and its type, separated by a colon, and the corresponding return type:

```js
(param: Type) => ReturnType
```

To make the signature familiar to readers, we use common JavaScript idioms such as destructuring, defaults, and rest parameters:

```js
({ count = 0: Number }) => Number
(...args: String) => Object
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
(input: String||Number) => String||Number;
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

By default, all values are optional. If you need to specify additional restrictions, you can:

```js
rtype User {
  name: required(String)
  avatarUrl: Url,
  about: String
}
```
