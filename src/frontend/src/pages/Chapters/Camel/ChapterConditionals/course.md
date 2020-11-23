# Chapter 7 : Conditionals

<dialog character="robot">[DROID-1242] INVALID CONDITIONAL INSTRUCTIONS. ERR %%$7834[[{23e3}]] PLEASE SPECIFY CONDITIONAL INSTRUCTIONS.</dialog>

## Booleans

Booleans are typed _bool_ in LIGO :

```
let a: bool = true // or false
```

## Comparing Values

Only values of the same type can be natively compared, i.e. int, nat, string, tez, timestamp, address, etc... However some values of the same type are not natively comparable, i.e. maps, sets or lists. You will have to write your own comparison functions for those.

```
// Comparing Strings
let a : string = "Alice"
let b : string = "Alice"
let c : bool = (a = b) // true

// Comparing numbers
let a : int = 5
let b : int = 4
let c : bool = (a = b) // false
let g : bool = (a >= b) // true
let h : bool = (a <> b) // true

// Comparing tez
let a : tez = 5mutez
let b : tez = 10mutez
let c : bool = (a = b) // false
```

⚠️ Notice that equality is checked with a single _=_ and not two like many languages.

⚠️ Also notice the use of _<>_ for the inequality operator.

## Conditionals

Conditional logic enables forking the control flow depending on the state.

```
let isSmall (n : nat) : bool =
if n < 10n then true else false
```

⚠️ Notice that, as in OCaml, in CameLIGO, if a conditional has a branch else (), that branch can be omitted.



## Your mission

We want to conditionally change the engine attribute (third number) to 1 only if it is equal to 0.

<!-- prettier-ignore -->1- Define a condition _if_ the engine attribute equal 0. Don't forget the attributes are defined as strings.

<!-- prettier-ignore -->2- If the condition is met, apply changes and return resulting new ship code. Otherwise, return the given ship code (parameter *my\_ship*).

<!-- prettier-ignore -->⚠️ If you have installed LIGO then you can test the execution of the *modify\_ship* function by running the following command:

```
ligo run-function main.ligo modify_ship '("010433")'
```