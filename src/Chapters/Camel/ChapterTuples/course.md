# Chapter 8 : Tuples

<dialog character="pilot">Hey captain, I'm lieutenant Washburne, the pilot of this piece of junk. Just let me know the coordinates of where you want to go and I'll try my best to bring us there in one piece...</dialog>

Tuple is a composite type that gathers multiple values in a specific order which can be retrieved with their indexes.

## Defining Tuples

To define a tuple, use *types* separated by the _\*_ operator :

```
type name = string * string  // Alias
```

And to define a value of this type :

```
let pilot : name = ("Garry", "Topper") // Optional parentheses
```

## Destructuring Tuples

If we want to get the first and last name of the full_name type, we can use destructuring. Destructuring a tuple allows you to give names to the elements inside the tuple.

```
let (first_name, last_name) : full_name = pilot
let login : string = String.sub 0n 1n first_name ^ "_" ^ last_name
```

We use the underscore _\__ to indicate that we ignore an element of the tuple.

```
let first_name ((first_name, _): full_name) = first_name
let alice = first_name full_name
```


## Access

You can access each components of a tuple by their position :

```
let my_name_first_name : string = my_name.0
let my_name_last_name : string = my_name.1
```


## Your mission

<!-- prettier-ignore -->1- Create a tuple type *coordinates* representing a 3D location.

<!-- prettier-ignore -->2- Define *earth_coordinates* at coordinates 2,7,1.

<!-- prettier-ignore -->3- Let's say you made a mistake in the definition. Define a new constant *modified_earth_coordinates* which reuses parameters of *earth_coordinates* except for the last parameter of *earth_coordinates* which is fixed to 5. Direct access by postion is asked (do not destructure *earth_coordinates*)
