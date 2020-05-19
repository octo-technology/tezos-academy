# Chapter 3 : Variables

<dialog character="mechanics">Seems like you have locked-in the parameters. You should unlock them so we can later change the ship configuration if need be.</dialog>

## Constants

Constants are immutable by design, which means their values cannot be reassigned. Put in another way, they can be assigned once, at their declaration. When defining a constant you need to provide a name, type and a value:

```
let age: int = 25;
```

## Variables


As expected in the pure subset of a functional language, CameLIGO only features constant values: once they are declared, the value cannot be changed (or "mutated").

```
let c: int = 2 + 3
let c : int = c - 3
```


## Your mission

<!-- prettier-ignore -->1- In the top right editor, modify the code from the previous chapter to make *my\_ship* a variable.

<!-- prettier-ignore -->2- On the next line, modify its value to _"222031"_
