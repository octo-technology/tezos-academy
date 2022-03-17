# Chapter 3 : Variables

<dialog character="mechanics">Seems like you have locked-in the parameters. You should unlock them so we can later change the ship configuration if need be.</dialog>

## Constants

Constants are immutable by design, which means their values cannot be reassigned. Put in another way, they can be assigned once, at their declaration. When defining a constant you need to provide a name, type and a value:

```
const age: int = 25;
age = 3; // gives an error
```

Unlike the other syntaxes, JsLIGO doesn't allow variable names to be reused in the same block scope:

```
let x = (a: int): int => {
  const age: int = 25;
  const age: int = 3; // will give an error
};
```

## Variables

Variables, unlike constants, are mutable. They cannot be declared in a global scope, but they can be declared and used within functions, or as function parameters.

```
let add = (a: int, b: int): int => {
  let c = a;
  c = c + b;
  return c
}
```

⚠️ Please be wary that mutation only works within the function scope itself, values outside of the function scope will not be affected. In other words, when a function is called, its arguments are copied, as well as the environment. Any side-effect to that environment is therefore lost when the function returns.

## Your mission

<!-- prettier-ignore -->1- In the top right editor, modify the code from the previous chapter to make *my\_ship* a variable.

<!-- prettier-ignore -->2- On the next line, modify its value to _"222031"_
