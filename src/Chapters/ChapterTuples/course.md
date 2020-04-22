# Chapter 8 : Tuples

<dialog character="pilot">Hey captain, I'm lieutenant Washburne, the pilot of this piece of junk. Just let me know the coordinates of where you want to go and I'll try my best to bring us there in one piece...</dialog>

Tuples gather multiple values in a specific order which can be retrieved with their indexes.

To define a tuple, use parenthesis and the _\*_ operator :

```
type name is (string * string)
```

And to define a value of this type :

```
const my_name : name = ("Jack", "Oneill")
```

## Access

You can access each components of a tuple by their position :

```
const my_name_first_name : string = my_name.0
const my_name_last_name : string = my_name.1
```

## Update

You can modify a component of tuple by assigning values as if it were a variable :

```
my_name.1 := "Carter"
```

## Your mission

<!-- prettier-ignore -->1- Create a tuple type *coordinates* representing a 3D location.

<!-- prettier-ignore -->2- Define *earth_coodinates* at coordinates 2,7,1.

<!-- prettier-ignore -->3- Let's say you made a mistake in the definition. Change the last parameters of *earth_coodinates* to 5.
