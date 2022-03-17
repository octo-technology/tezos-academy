# Chapter 10 : Maps

<dialog character="pilot">Ok it's now time to open our star map and decide where we want to go.</dialog>

Maps are a data structure which associate values of the same type to values of the same type. The former are called key and the latter values. Together they make up a binding. An additional requirement is that the type of the keys must be comparable, in the Michelson sense.

## Declaration

Maps are declared as

```
type balances = map<string, nat>;
```

## Instantiation

To create an empty map :

```
let empty: balances = Map.empty;
```

To create an non-empty map :

```
let moves: balances = Map.literal(list([
    ["tim", 5 as nat],
    ["mark", 0 as nat]
]));
```

## Access

Use the postfix [] operator to read a value of the map :

```
let my_balance: option<nat> = Map.find_opt("tim", moves);
```

ℹ️ The keyword option shows that this value is optional. More on this later.

## Update

The values of a map can be updated using _Map.update_ built-in function:

```
let user_balances: balances = Map.update("tim", Some(14 as nat), moves);
```

## Insertion

To add a new value in the map, use _Map.add_ :

```
let user_balances: balances = Map.add("ed", 39 as nat, moves);
```

## Removal

A key-value can be removed from the mapping as follows :

```
Map.remove("tim", moves);
```

## Big Maps

<!-- prettier-ignore -->Maps load their entries into the environment, which is fine for small maps, but for maps holding millions of entries, the cost of loading such map would be too expensive. For this we use *big\_maps*. Their syntax is the same as for regular maps.

## Your mission

<!-- prettier-ignore -->1- Notice we defined _coordinates_ as a 3D tuple.

<!-- prettier-ignore -->2- Define the type *name\_to\_coordinates* as a mapping from the celestial body name to its coordinates.

<!-- prettier-ignore -->3- Create a new map called *star\_map* and add values for _earth_ at 2,7,1 , the _sun_ at 0,0,0 and _alpha-centauri_ at 2232,7423,12342 .
