# Chapter 8 : Tuples

<dialog character="pilot">Hey captain, I'm lieutenant Washburne, the pilot of this piece of junk. Just let me know the coordinates of where you want to go and I'll try my best to bring us there in one piece...</dialog>

Tuples gather multiple values in a specific order which can be retrieved with their indexes.

To define a tuple, use parenthesis and the _,_ operator :

```
type full_name = (string, string);
```

And to define a value of this type :

```
let person : full_name = ("Jack", "Oneill");
```

## Destructuring tuples

If we want to get the first and last name of the full_name type, we can use destructuring. Destructuring a tuple allows you to give names to the elements inside the tuple.

```
let (first_name, last_name) : full_name = person
```

This also works in functions:

```
let first_name = ((first_name, _): full_name) => first_name
let jack = first_name(person)
```

Notice that we use the underscore to indicate that we ignore the last element of the tuple.

## Access

You can access components by their position in their tuple. Tuple components are zero-indexed, that is, the first component has index 0.

```
let first_name : string = person[0];
let last_name : string =  person[1];
```


## Your mission

<!-- prettier-ignore -->1- Create a tuple type *coordinates* representing a 3D location.

<!-- prettier-ignore -->2- Define *earth_coordinates* at coordinates 2,7,1.

<!-- prettier-ignore -->3- Let's say you made a mistake in the definition. Define a new constant *modified_earth_coordinates* which reuses parameters of *earth_coordinates* except for the last parameter of *earth_coordinates* which is fixed to 5. Direct access by postion is asked (do not destructure *earth_coordinates*)