# Chapter 9 : Records

<dialog character="pilot">Thanks for the coordinates captain but I'm not sure I understand which value corresponds to which coordinate. You mean x,y,z ? You may want to be more explicit.</dialog>

Records are like tuples but with named parameters. In other words, they hold a set of key/data pairs. To instanciate a record, you must first declare its type as follow :

```
type user is
  record [
    id : nat;
    is_admin : bool;
    name : string
  ]
```

And here is how to define an associated record value :

```
const alice : user =
  record [
    id = 1n;
    is_admin = true;
    name = "Alice"
  ]
```

## Access

You can access the whole record or get one key in particular :

```
const alice_is_admin : bool = alice.is_admin
```

## Update

You can modify values in a record as follows :

```
function change_name (const u : user) : user is
  block {
      const u : user = u with record [name = "Mark"]
  } with u
```

⚠️ Note that user has not been changed by the function. Rather, the function returned a nameless new version of it with the modified name.

## Patch

A patch takes a record to be updated and a record with a subset of the fields to update, then applies the latter to the former.

```
function change_name (const u : user) : user is
  block {
      patch u with record [name = "Mark"]
  } with u
```

## Your mission

<!-- prettier-ignore -->1- Refactor the type of coordicanteas as a record instead of a tuple. Name the parameters x, y and z.

<!-- prettier-ignore -->2- Refactor *earth\_coordinates* with the record type.

<!-- prettier-ignore -->2- Refactor the *earth\_coordinates* update of the last parameters with the record type.
