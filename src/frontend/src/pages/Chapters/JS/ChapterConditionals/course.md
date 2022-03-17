# Chapter 7 : Conditionals

<dialog character="robot">[DROID-1242] INVALID CONDITIONAL INSTRUCTIONS. ERR %%$7834[[{23e3}]] PLEASE SPECIFY CONDITIONAL INSTRUCTIONS.</dialog>

## Booleans

Booleans are typed _bool_ in LIGO :

```
let a: bool = true; // or false
```

## Comparing Values

Only values of the same type can be natively compared, i.e. int, nat, string, tez, timestamp, address, etc... However some values of the same type are not natively comparable, i.e. maps, sets or lists. You will have to write your own comparison functions for those.

```
// Comparing strings
let a: string = "Alice";
let b: string = "Alice";
let c: bool = (a == b); // true

// Comparing numbers
let a: int = 5;
let b: int = 4;
let c: bool = (a == b);
let d: bool = (a > b);
let e: bool = (a < b);
let f: bool = (a <= b);
let g: bool = (a >= b);
let h: bool = (a != b);

// Comparing tez
let a: tez = 5 as mutez;
let b: tez = 10 as mutez;
let c: bool = (a == b); // false
```

## Conditionals

Conditional logic enables forking the control flow depending on the state.

```
let isSmall = (n : nat) : bool => {
  if (n < (10 as nat)) { return true; } else { return false; };
};
```

## Your mission

We want to conditionally change the engine attribute (third number) to 1 only if it is equal to 0.

<!-- prettier-ignore -->1- Refactor *modified\_ship* as a variable equal to *my\_ship*

<!-- prettier-ignore -->2- Then define a condition _if_ the engine attribute equal 0. Don't forget the attributes are defined as strings.

<!-- prettier-ignore -->3- If the condition is met, change *modified\_ship* to it new value. Otherwise, _skip_ the instructions.

<!-- prettier-ignore -->⚠️ If you have installed LIGO then you can test the execution of the *modify\_ship* function by running the following command:

```
ligo run-function main.ligo modify_ship '("010433")'
```
