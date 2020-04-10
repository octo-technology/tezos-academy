# Chapter 3 : Variables

## Constants

Constants are immutable by design, which means their values cannot be reassigned. Put in another way, they can be assigned once, at their declaration. When defining a constant you need to provide a name, type and a value:

```
const age: int = 25;
```

## Variables

Variables, unlike constants, are mutable. They cannot be declared in a global scope, but they can be declared and used within functions, or as function parameters.

```
var c: int := 2 + 3
c := c - 3
```

⚠️ Notice the assignment operator _:=_ for var, instead of _=_ for constants.

## Your mission

Interstellar Academy advise: Every space pilot must learn the basics before flying on your own winglets. 

<!-- prettier-ignore -->
1- In the top right editor, modify the code from the previous chapter to make *my\_ship* a variable.

2- On the next line, modify its value to _"222031"_
