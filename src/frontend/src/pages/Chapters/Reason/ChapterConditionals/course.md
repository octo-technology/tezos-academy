# Chapter 7 : Conditionals

<dialog character="robot">[DROID-1242] INVALID CONDITIONAL INSTRUCTIONS. ERR %%$7834[[{23e3}]] PLEASE SPECIFY CONDITIONAL INSTRUCTIONS.</dialog>

## Booleans

Booleans are typed _bool_ in LIGO :

```
let a: bool = true // or false
```

Common logical operators on _bool_ :

```
let logical_and: bool = true && true;   // and
let logical_or: bool = false || true;   // or
let logical_not: bool = !false;         // not
let eq: bool = 2 == 3;                  // equals
let not_eq: bool = 2 != 3;              // different
let gt: bool = 4 > 3;                   // greater than
let gte: bool = 4 <= 3;                 // lesser than or equal
```

## Comparing Values

Only values of the same type can be natively compared, i.e. int, nat, string, tez, timestamp, address, etc... However some values of the same type are not natively comparable, i.e. maps, sets or lists. You will have to write your own comparison functions for those.

```
// Comparing Strings
let a : string = "Alice";
let b : string = "Alice";
let c : bool = (a == b); // true

// Comparing numbers
let a : int = 5;
let b : int = 4;
let c : bool = (a == b); // false
let g : bool = (a >= b); // true
let h : bool = (a != b); // true

// Comparing tez
let a : tez = 5mutez;
let b : tez = 10mutez;
let c : bool = (a == b); // false
```

⚠️ Notice that equality is checked with a single _==_.

⚠️ Also notice the use of _!=_ for the inequality operator.

## Conditionals

Conditional logic enables forking the control flow depending on the state.

```
let isSmall = (n : nat) : bool =>
  if (n < 10n) { true; } else { false; };
```

⚠️ Notice the *then* clause and *else* clause are blocks of instructions between _{_ and _}_.

⚠️ Notice the _;_ at the end of _if_ instruction.

## Your mission

We want to conditionally change the engine attribute (third number) to 1 only if it is equal to 0.

<!-- prettier-ignore -->1- Define a condition _if_ the engine attribute equal 0. Don't forget the attributes are defined as strings.

<!-- prettier-ignore -->2- If the condition is met, compute the new ship_code value in a constant *modified\_ship* and return *modified\_ship*. Otherwise, return the *my\_ship* constant (given as parameter of the function).
