# Chapter 10 : Maps

<dialog character="pilot">Ok it's now time to open our star map and decide where we want to go.</dialog>

Maps are a data structure which associate values of the same type to values of the same type. The former are called key and the latter values. Together they make up a binding. An additional requirement is that the type of the keys must be comparable, in the Michelson sense.

## Declaration

Maps are declared as

```
type register = map (address, nat);
```

## Instantiation

To create an empty map :

```
let empty : register = Map.empty
```

To create an non-empty map :

```
let moves : register =
  Map.literal ([
    ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address, 3n),
    ("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address, 45n)]);
```

The _Map.literal_ predefined function builds a map from a list of key-value pair tuples, _(<key>, <value>)_ separated by _,_.

⚠️ Notice ("<string value>": address) means that we type-cast a string into an address

## Access

Use the _Map.find\_opt_ predefined function to read a value associated to a key in the map :

```
let my_balance : option (nat) =
  Map.find_opt (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address), moves);
```

ℹ️ The keyword option shows that this value is optional. More on this later (Chapter Optional).

## Update

We can update a binding in a map in ReasonLIGO by means of the _Map.update_ built-in function :

```
let assign = (m : register) : register =>
  Map.update
    (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address), Some (8n), m);
```

⚠️ Notice the optional value *Some (8n)* instead of *8n*. If we had use *None* instead, that would have meant that the binding is removed.  More on this later (Chapter Optional).

## Insertion

To add add a key and its associated value in the map, use the _Map.add_ built-in function :

```
let add = (m : register) : register =>
  Map.add
    (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN" : address), 8n, m);
```

## Removal

To remove a binding (key-value) from a map, we need its key.

In ReasonLIGO, we use the predefined function _Map.remove_ as follows:

```
let delete = ((key, moves) : (address, register)) : register =>
  Map.remove (key, moves);
```


## Functional Iteration over Maps

A functional iterator is a function that traverses a data structure and calls in turn a given function over the elements of that structure to compute some value.

There are three kinds of functional iterations over LIGO maps: the *iterated operation*, the *map operation* (not to be confused with the map data structure) and the *fold operation*.

### Iterated Operation over Maps

The first, the *iterated operation*, is an iteration over the map with no return value. This can be useful if for example you would like to check that each value inside of a map is within a certain range, and fail with an error otherwise.

The predefined functional iterator implementing the *iterated operation* over maps is called *Map.iter*.
In the following example, the balances are iterated to check that the value is above *3*.

```
let iter_op = (m : register) : unit => {
  let predicate = ((i,j) : (address, nat)) => assert (j > 3n);
  Map.iter (predicate, m);
};
```

### Map Operations over Maps

We may want to change all the bindings of a map by applying to them a function. This is called a *map operation*, not to be confused with the map data structure. The predefined functional iterator implementing the *map operation* over maps is called _Map.map_. In the following example, we add *1* to the value in the balances.

```
let map_op = (m : register) : register => {
  let increment = ((i,j): (address, nat)) => (j + 1n);
  Map.map (increment, m);
};
```

### Folded Operations over Maps

A folded operation is the most general of iterations. The folded function takes two arguments: an *accumulator* and the *structure element* at hand, with which it then produces a new accumulator. This enables having a partial result that becomes complete when the traversal of the data structure is over.

The predefined functional iterator implementing the folded operation over maps is called _Map.fold_ and is used as follows.

```
let fold_op = (m : register) : int => {
  let folded = ((i,j): (int, (address, nat))) => i + j[1];
  Map.fold (folded, m, 0);
};
```

## Big Maps

<!-- prettier-ignore -->Maps load their entries into the environment, which is fine for small maps, but for maps holding millions of entries, the cost of loading such map would be too expensive. For this we use *big\_maps*. Their syntax is the same as for regular maps.

## Your mission

<!-- prettier-ignore -->1- Notice we defined _coordinates_ as a 3D tuple.

<!-- prettier-ignore -->2- Define the type *name\_to\_coordinates* as a mapping from the celestial body name to its coordinates.

<!-- prettier-ignore -->3- Create a new map called *star\_map* and add values for _earth_ at 2,7,1 , the _sun_ at 0,0,0 and _alpha-centauri_ at 2232,7423,12342 .
