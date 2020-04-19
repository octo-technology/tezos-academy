# Chapter 4 : Math

<dialog character="scientist">Hello rookie, I'm Dr Zod, I hope you didn't sleep during your Math class in the academy because you're gonna need it! Your ship needs at least 1.21 gigawatts to function properly. Battery packs are 0.16 gigawatts per unit. How many battery packs do you need? Seems easy, right? Well, no, because the system doesn't run floating point numbers, so... good luck with that!</dialog>
 
LIGO offers three built-in numerical types:

- _int_ are integers, such as 10, -6 and 0.

- _nat_ are natural numbers (integral numbers greater than or equal to zero). They are follwed by the suffix _n_ such as 3n, 12n and 0n for the natural zero.

- _tez_ are units of measure of Tezos tokens. They can be decinmals and are followed by _tez_ or _tz_ such as 3tz or 12.4tez. You can also type units of millionth of tez, using the suffix _mutez_ after a natural literal, such as 10000mutez or 0mutez.

⚠️ Notice there are no floating point types in LIGO as they are not determinist in hardware modules.

<!-- prettier-ignore -->
ℹ️Large integral values can be expressed using underscores to separate groups of digits, like 1\_000mutez or 0.000\_004tez. Notice 1tez = 1\_000\_000mutez.

## Addition

Addition in LIGO is accomplished by means of the + infix operator. Some type constraints apply, for example you cannot add a value of type tez to a value of type nat.

```
const a : int = 5 + 10
const b : int = 5n + 10
const c : tez = 5mutez + 0.000_010tez
```

⚠️ You cannot add a tez and a int.

## Substraction

Substractions follow the same principles.

```
const a : int = 5 - 10
const b : int = 5n - 2n
const d : tez = 5mutez - 1mutez
```

## Multiplication

Multiplications follow the same principles.

```
const a : int = 5 * 5
const b : nat = 5n * 5n
const c : tez = 5n * 5mutez
```

## Division

Divisions follow the same principles.

```
const a : int = 10 / 3
const b : nat = 10n / 3n
const c : nat = 10mutez / 3mutez
```

⚠️ Remember that there are no floating point numbers in LIGO so dividing 9 by 2 will output 4 and not 4.5

## Modulo

Modulos follow the same principles.

```
const a : int = 120
const b : int = 9
const rem1 : nat = a mod b  // 3
```

## From int to nat and back

You can cast an int to a nat and vice versa using the _int_ or _abs_ functions. Here is how:

```
const a: int = int(1n)
const b: nat = abs(1)
```

## Checking a nat

<!-- prettier-ignore -->
*is\_nat* returns a _nat_ or _None_

```
const is_a_nat : option (nat) = is_nat (1)
```

## Your mission

<!-- prettier-ignore -->1- In the editor, define *required\_energy* for 1.21 gigawatts. Since Tezos doesn't support floating point numbers, let's work in megawatts instead so that you can write the amount of energy as an _int_.

<!-- prettier-ignore -->2- Define *energy\_per\_battery\_pack* for 0.16 gigawatts.

<!-- prettier-ignore -->3- Define and compute *required\_battery\_packs* as the number of battery packs required to power your ship.
