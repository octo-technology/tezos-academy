# Chapter 9 : Records

Records are like Javascript object. They hold a set of key/data pairs. To instanciate a record, you must first declare its type as follow :

```
type user is
  record [
    id       : nat;
    is_admin : bool;
    name     : string
  ]
```

And here is how to define an associated record value :

```
const alice : user =
  record [
    id       = 1n;
    is_admin = true;
    name     = "Alice"
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
function change_name (const u : user ) : user is
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

1- Your mission to create the _ship_ type as a record for the _name_ of your ship, its _code_, and its _price_ in tez.

<!-- prettier-ignore -->
2- Create *my\_ship* as a _ship_ with the name "Galactica", code "222031" and a price of 1 tez
