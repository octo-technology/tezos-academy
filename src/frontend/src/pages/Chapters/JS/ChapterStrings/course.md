# Chapter 5 : Strings

<dialog character="mechanics">Red alert captain! When you powered the ship, the engines exploded... Seems like someone sabotaged the igniter! We should find out later. For now, you need to replace the damaged part.</dialog>

Strings are defined using the built-in string type as follows:

```
const a: string = "Hello Captain Rogers";
```

or with single quotes

```
const a: string = 'Hello Captain Rogers';
```

## Concatenating Strings

Strings can be concatenated using the _+_ operator.

```
const name: string = "Captain Rogers";
const greeting: string = "Hello";
const full_greeting: string = greeting + " " + name;
```

## Slicing Strings

Strings can be sliced using a built-in function _String.sub_ which takes three parameters:

- an _offset_ describing the index of first character that will be copied
- the _length_ describing the number of characters that will be copied (starting from the given offset)
- the _string_ being sliced

The function _String.sub_ can be used as follows:

```
const name: string = "Captain Rogers";
const slice: string = String.sub(0 as nat, 1 as nat, name);
```

⚠️ Notice that the offset and length of the sub function are natural numbers.

If you want to concatenate to substrings you need to add an empty string before the expression to help Ligo make a proper type conversion:

```
const name: string = "Captain Rogers";
const slice: string = "" + String.sub(8 as nat, 6 as nat, name) + ", welcome on board!";
```

⚠️ Notice that in more mature versions of JsLIGO this might be not necessary.

## Length of Strings

The length of a string can be found using a built-in function _String.length_ as follows:

```
const name: string = "Captain Rogers";
const length: nat = String.length(name); // length = 14
```

## Your mission

<!-- prettier-ignore -->1 - Reassign *my\_ship* by modifying the engine attribute (third number) from 0 to 1. Use substrings for the attributes before and after to make sure they are untouched.
