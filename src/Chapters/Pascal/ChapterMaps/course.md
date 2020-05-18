# Chapter 10 : Maps

<dialog character="pilot">Ok it's now time to open our star map and decide where we want to go.</dialog>

Maps are a data structure which associate values of the same type to values of the same type. The former are called key and the latter values. Together they make up a binding. An additional requirement is that the type of the keys must be comparable, in the Michelson sense.

## Declaration

Maps are declared as

```
type balances is map (string, nat)
```

## Instanciation

To create an empty map :

```
const empty : balances = map []
```

To create an non-empty map :

```
const user_balances : balances =
    map [
        "tim" -> 5n;
        "mark" -> 0n
    ]
```

## Access

Use the postfix [] operator to read a value of the map :

```
const my_balance : option (nat) = user_balances ["tim"]
```

ℹ️ The keyword option shows that this value is optional. More on this later.

## Update

The values of a map can be updated using the usual assignment syntax :

```
user_balances ["tim"] := 2n
```

## Insertion

To add a new value in the map, use the usual assignment syntax :

```
user_balances ["ed"] := 39n
```

## Removal

A key-value can be removed from the mapping as follows :

```
remove "tim" from map user_balances
```

## Big Maps

<!-- prettier-ignore -->Maps load their entries into the environement, which is fine for small maps, but for maps holding millions of entries, the cost of loading such map would be too expensive. For this we use *big\_maps*. Their syntax is the same as for regular maps.

## Your mission

<!-- prettier-ignore -->1- Notice we defined _coordinates_ as a 3D tuple.

<!-- prettier-ignore -->2- Define the type *name\_to\_coordinates* as a mapping from the celestial body name to its coordinates.

<!-- prettier-ignore -->3- Create a new map called *star\_map* and add values for _earth_ at 2,7,1 , the _sun_ at 0,0,0 and _alpha-centauri_ at 2232,7423,12342 .
