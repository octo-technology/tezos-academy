# Chapter 15 : Tuples

Tuples gather multiple values in a specific order and those values are called components. It is equivalent to a record except that components are not named and values can be retrieved by their index (position) instead of their names. Tuple components are zero-indexed, that is, the first component has index 0.
To easily manipulate tuples, you can declare custom type based on a tuple definition :

```
type user is (nat * bool * string)
```

And here is how to define an associated record value :

```
const alice : user = (1n, true, "Alice")
```

## Access

You can access to components of tuple by their position :

```
const alice_id : nat = alice.0;
const alice_is_admin : bool = alice.1;
```

## Tuples

You can modify a component of tuple by assigning values as if it were a variable :

```
alice.2 := "newAlice";
```


## Your mission

1- Your mission is to create the _ship_ type as a tuple with the _name_ of your ship as string, its _code_ as string, and its _price_ in tez.

<!-- prettier-ignore -->
2- Create *my\_ship* as a _ship_ with the name "Galactica", code "222031" and a price of 1 tez
3- Modify *my\_ship* name with the name "Enterprise"

