# Chapter 12 : Unit, Variant, Option and Pattern matching

<dialog character="mechanics">Captain, before we go, you may want to setup your commands to set the ship code and go to a destination.</dialog>

Optionals are a pervasive programing pattern in OCaml. Since Michelson and LIGO are both inspired by OCaml, optional types are available in LIGO as well. Similarly, OCaml features a unit type, and LIGO features it as well. Both the option type and the unit types are instances of a more general kind of types: variant types (sometimes called sum types).

## Unit

The unit type in Michelson or LIGO is a predefined type that contains only one value that carries no information. It is used when no relevant information is required or produced. Here is how it used.

In PascaLIGO, the unique value of the unit type is Unit.

```
const n : unit = Unit // Note the capital letter
```

## Variant

A variant type is a user-defined or a built-in type (in case of options) that defines a type by cases, so a value of a variant type is either this, or that or... The simplest variant type is equivalent to the enumerated types found in Java, C++, JavaScript etc.

Here is how we define a coin as being either head or tail (and nothing else):

```
type Coin is Head | Tail
const head : Coin = Head
const tail : Coin = Tail
```

The names Head and Tail in the definition of the type coin are called data constructors, or variants. In this particular, they carry no information beyond their names, so they are called constant constructors.

In general, it is interesting for variants to carry some information, and thus go beyond enumerated types. In the following, we show how to define different kinds of users of a system.

```
type Id is nat

type User is
Admin of Id
| Manager of Id
| Guest

const user : User = Admin (1000n)
const guest : User = Guest
```

In LIGO, a constant constructor is equivalent to the same constructor taking an argument of type unit, so, for example, Guest is the same value as Guest (unit).

## Option

The option type is a predefined variant type that is used to express whether there is a value of some type or none. This is especially useful when calling a partial function, that is, a function that is not defined for some inputs. In that case, the value of the option type would be None, otherwise Some (v), where v is some meaningful value of any type. An example in arithmetic is the division operation:

```
function div (const a : nat; const b : nat) : option (nat) is
if b = 0n then (None: option (nat)) else Some (a/b)
```

## Pattern matching

Pattern matching is similiar to the switch construct in Javascript, and can be used to route the program's control flow based on the value of a variant. Consider for example the definition of a function flip that flips a coin.

```
type Coin is Head | Tail

function flip (const coin : Coin) : coin is
case coin of
Head -> Tail
| Tail -> Head
end
```

## Your mission

<!-- prettier-ignore -->1- Create the type _action_ as a variant.

<!-- prettier-ignore -->2- Define the first option of the variant as *Set\_ship\_code* which will be our action to set the ship code. Notice this will take a string as an input.

<!-- prettier-ignore -->3- Define the second option of the variant as *Go\_to* which will be our action to set the ship on course to a new destination. Notice this will also take a string as an input.
