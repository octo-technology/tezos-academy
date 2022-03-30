# Chapter 9 : Records

<dialog character="pilot">Thanks for the coordinates captain but I'm not sure I understand which value corresponds to which coordinate. You mean x,y,z ? You may want to be more explicit.</dialog>

Records are like tuples but with named parameters. In other words, they hold a set of key/data pairs. To instantiate a record, you must first declare its type as follows :

```
type user = {
  id       : nat,
  is_admin : bool,
  name     : string
};
```

And here is how to define an associated record value :

```
let alice : user = {
  id       : 1 as nat,
  is_admin : true,
  name     : "Alice"
};
```

## Access

You can access the whole record or get one key in particular :

```
let alice_admin: bool = alice.is_admin;
```

## Update

You can modify values in a record as follows :

```
let change_name = (u: user): user => ({...u, name: "Mark"});
```

⚠️ Note that user has not been changed by the function. Rather, the function returned a nameless new version of it with the modified name.

## Your mission

<!-- prettier-ignore -->1- Refactor the type of *coordinates* as a record instead of a tuple. Name the parameters *x*, *y* and *z*.

<!-- prettier-ignore -->2- Refactor *earth\_coordinates* with the record type.

<!-- prettier-ignore -->3- Refactor the *modified\_earth\_coordinates* update of the last parameters with the record type.

<!-- prettier-ignore -->⚠️ If you have installed LIGO then you can check the value of the *modified\_earth\_coordinates* variable by running the following command:

```
ligo run interpret --init-file exercise.jsligo 'modified_earth_coordinates'
```
