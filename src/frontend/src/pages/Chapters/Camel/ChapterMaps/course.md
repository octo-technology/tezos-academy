# Chapter 10 : Maps

<dialog character="pilot">Ok it's now time to open our star map and decide where we want to go.</dialog>

Maps are a data structure which associate values of the same type to values of the same type. The former are called key and the latter values. Together they make up a binding. An additional requirement is that the type of the keys must be comparable, in the Michelson sense.

## Declaration

Maps are declared as

```
type balances = (address, int) map
```

## Instanciation

To create an empty map :

```
let empty : balances = Map.empty
```

To create an non-empty map :

```
let bal : balances =
  Map.literal [
    (("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address), 5);
    (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address), 10)]
```

 Note also the _;_ to separate individual map entries. ("<string value>": address) means that we type-cast a string into an address.

## Access

Use the postfix Map.find_opt operator to read a value of the map :

```
let my_balance : int option =
  Map.find_opt ("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address) bal
```

ℹ️ The keyword _option_ shows that this value is optional. More on this later.


## Update

Given a map, we may want to add a new binding, remove one, or modify one by changing the value associated to an already existing key. All those operations are called updates.
The values of a map can be updated using the Map.update function :

```
let assign (m : balances) : balances =
  Map.update
    ("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address) (Some (8)) bal
```

Notice the optional value Some (8) instead of 8. If we had use None instead, that would have meant that the binding is removed.

## Insertion

To add a new value in the map, use the Map.add function :

```
let add (m : balances) : balances =
  Map.add
    ("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address) (8) m
```

## Removal

A key-value can be removed from the mapping by using the Map.remove function as follows :

```
let delete (key, bals : address * balances) : balances =
  Map.remove key bals
```

## Functional Iteration over Maps

A functional iterator is a function that traverses a data structure and calls in turn a given function over the elements of that structure to compute some value.

There are three kinds of functional iterations over LIGO maps: the *iterated operation*, the *map operation* (not to be confused with the map data structure) and the *fold operation*.

### Iterated Operation over Maps

The first, the iterated operation, is an iteration over the map with no return value. This can be useful if for example you would like to check that each value inside of a map is within a certain range, and fail with an error otherwise.

The predefined functional iterator implementing the iterated operation over maps is called *Map.iter*.
In the following example, the balances are iterated to check that the value is above 3.

```
let iter_op (b : balances) : unit =
  let predicate = fun (i,j : address * int) -> assert (j > 3)
  in Map.iter predicate b
```

### Map Operations over Maps

We may want to change all the bindings of a map by applying to them a function. This is called a map operation, not to be confused with the map data structure. The predefined functional iterator implementing the map operation over maps is called _Map.map_. In the following example, we add *1* to the value in the balances.

```
let map_op (m : balances) : balances =
  let increment = fun (i,j : address * int) -> j + 1
  in Map.map increment m
```

### Folded Operations over Maps

A folded operation is the most general of iterations. The folded function takes two arguments: an *accumulator* and the *structure element* at hand, with which it then produces a new accumulator. This enables having a partial result that becomes complete when the traversal of the data structure is over.

The predefined functional iterator implementing the folded operation over maps is called _Map.fold_ and is used as follows.

```
let fold_op (m : balances) : int =
  let folded = fun (i,j : int * (address * int)) -> i + j.1
  in Map.fold folded m 5
```

## Big Maps

<!-- prettier-ignore -->Maps load their entries into the environement, which is fine for small maps, but for maps holding millions of entries, the cost of loading such map would be too expensive. For this we use *big\_maps*. Their syntax is the same as for regular maps.

```
Big_map.empty
Big_map.literal
Big_map.find_opt
Big_map.update
```

## Your mission

<!-- prettier-ignore -->1- Notice we defined _coordinates_ as a 3D tuple.

<!-- prettier-ignore -->2- Define the type *name\_to\_coordinates* as a mapping from the celestial body name to its coordinates.

<!-- prettier-ignore -->3- Create a new map called *star\_map* and add values for _earth_ at 2,7,1 , the _sun_ at 0,0,0 and _alpha-centauri_ at 2232,7423,12342 .
