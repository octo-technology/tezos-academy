# Chapter 7 : Conditionals

<dialog character="robot">[DROID-1242] INVALID CONDITIONAL INSTRUCTIONS. ERR %%$7834[[{23e3}]] PLEASE SPECIFY CONDITIONAL INSTRUCTIONS.</dialog>

## Booleans

Booleans are typed _bool_ in LIGO :

```
const a: bool = true // or false
```

## Comparing Values

Only values of the same type can be natively compared, i.e. int, nat, string, tez, timestamp, address, etc... However some values of the same type are not natively comparable, i.e. maps, sets or lists. You will have to write your own comparison functions for those.

```
// Comparing Strings
const a : string = "Alice"
const b : string = "Alice"
const c : bool = (a = b) // true

// Comparing numbers
const a : int = 5
const b : int = 4
const c : bool = (a = b) // false
const g : bool = (a >= b) // true
const h : bool = (a =/= b) // true

// Comparing tez
const a : tez = 5mutez
const b : tez = 10mutez
const c : bool = (a = b) // false
```

## Conditionals

Conditional logic enables forking the control flow depending on the state.

```
function isSmall (const n : nat) : bool is
if n < 10n then true else false
```

⚠️ When the branches of the conditional are not a single expression, as above, we need a block:

```
if x < y then
block {
x := x + 1;
y := y - 1
}
else skip;
```

## Your mission

We want to add contional so that we change the engine attribute to 1 only if it is equal to 0.

<!-- prettier-ignore -->1- Refactor *modified\_ship* as a variable equal to *my\_ship*

<!-- prettier-ignore -->2- Then define a condition _if_ the engine attribute equal 0. Don't forget the attribates are defined as strings.

<!-- prettier-ignore -->3- If the condition is met, change *modified\_ship* to it new value. Otherwise, _skip_ the instructions.
