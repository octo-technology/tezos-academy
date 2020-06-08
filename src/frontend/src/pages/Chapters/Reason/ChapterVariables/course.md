# Chapter 3 : Variables

<dialog character="mechanics">Seems like you have locked-in the parameters. You should unlock them so we can later change the ship configuration if need be.</dialog>

## Constants

Constants are immutable by design, which means their values cannot be reassigned. Put in another way, they can be assigned once, at their declaration. When defining a constant you need to provide a _name_, _type_ and a _value_:

```
let age : int = 25;
let age : string = "old";   //error illed type
let age = 42;   // ok
```

⚠️ Notice the constant *age* can be squashed by another constant definition with the same name. Once the type of constant has been defined or induced the constant cannot handle other types.

## Variables

As expected in the pure subset of a functional language, ReasonLIGO only features constant values: once they are declared, the value cannot be changed (or "mutated").

```
let add = ((a, b): (int, int)): int => {
  let c : int = a + b;
  c;
};
```

⚠️ Notice the returned value of the function *add* is the temporary *c* constant.

## Your mission

<!-- prettier-ignore -->1- In the top right editor, modify the code from the previous chapter to make *my\_ship* a variable.

<!-- prettier-ignore -->2- On the next line, modify its value to _"222031"_
