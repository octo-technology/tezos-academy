# Chapter 5 : Strings

Strings are defined using the built-in string type as follows:

```
const a: string = "Hello Captain Rogers";
```

## Concatenating Strings

Strings can be concatenated using the _^_ operator.

```
const name: string = "Captain Rogers"
const greeting: string = "Hello"
const full_greeting: string = greeting ^ " " ^ name
```

## Slicing Strings

Strings can be sliced using a built-in function _String.sub_ as follows:

```
const name: string = "Captain Rogers"
const slice: string = String.sub(0n, 1n, name)
```

⚠️ Notice that the offset and length of the sub function are natural numbers.

## Length of Strings

The length of a string can be found using a built-in function _String.length_ as follows:

```
const name: string = "Captain Rogers"
const length: nat = String.length(name) // length = 14
```

## Your mission

<!-- prettier-ignore -->
1- Modify the third attribute of *my\_ship* from 2 to 1
