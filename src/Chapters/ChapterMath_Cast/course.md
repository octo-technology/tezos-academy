# Chapter 4 : Math

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

## Modulo

Modulos follow the same principles.

```
const a : int = 120
const b : int = 9
const rem1 : nat = a mod b  // 3
```

## From int to nat and back

You can cast an int to a nat and vice versa. Here is how:

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

<!-- prettier-ignore -->
An armoured battleship _ship1_ is attacking a weaker battleship _ship2_. A third ship (_ship3_) is coming to rescue _ship2_ in order to have an even fight ! 
1- In the editor, compute _ship3_ armor (which is the difference of armor between _ship1_ and _ship2_) in a constant variable *diff\_armor*
2- In the editor, assign previously computed _ship3_ armor to variable *ship3\_armor*
