# Chapter 7 : Conditionals

## Booleans

Booleans are typed _bool_ in LIGO :

```js
const a: boolean = true; // or false
```

# Comparing Values

Only values of the same type can be natively compared, i.e. int, nat, string, tez, timestamp, address, etc... However some values of the same type are not natively comparable, i.e. maps, sets or lists. You will have to write your own comparison functions for those.

```js
// Comparing Strings
const a : string = "Alice"
const b : string = "Alice"
const c : bool = (a = b) // true

// Comparing numbers
const a : int = 5
const b : int = 4
const c : bool = (a = b) // falase
const g : bool = (a >= b) // true
const h : bool = (a =/= b) // true

// Comparing tez
const a : tez = 5mutez
const b : tez = 10mutez
const c : bool = (a = b) // false
```

# Conditionals

Conditional logic enables forking the control flow depending on the state.

```js
function isSmall (const n : nat) : bool is
if n < 10n then true else false
```

⚠️ When the branches of the conditional are not a single expression, as above, we need a block:

```js
if x < y then
block {
x := x + 1;
y := y - 1;
}
else skip;
```

# Your mission

<!-- prettier-ignore -->
Add a conditional to the *modify\_ship* function so that you only modify the ship code if the third attribute is "2"
