#Chapter 3 : Variables

## Constants

Constants are immutable by design, which means their values cannot be reassigned. Put in another way, they can be assigned once, at their declaration. When defining a constant you need to provide a name, type and a value:

```js
const age: int = 25;
```

## Variables

Variables, unlike constants, are mutable. They cannot be declared in a global scope, but they can be declared and used within functions, or as function parameters.

```js
function add (const a : int; const b : int) : int is
  block {
    var c : int := a + 2*b;
    c := c - b
  } with c
```

⚠️ Notice the assignment operator := for var, instead of = for constants.

## Your mission

1- In the top right editor, modify the code from the previous chapter to make my_ship a variable.

2- On the next line, modify its value to "222031"
