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
  id       : 1n,
  is_admin : true,
  name     : "Alice"
};
```

## Access

You can access the whole record or get one key in particular by using the _._ operator:

```
let alice_admin : bool = alice.is_admin;
```

## Update


The syntax for the functional updates of record in ReasonLIGO follows that of ReasonML. You can modify values in a record as follows :

```
let change_name = ( u : user) : user =>
{ ...u, name : "Mark" };
```

⚠️ Note that user has not been changed by the function. Rather, the function returned a nameless new version of it with the modified name.

⚠️ Notice the operator _..._ that destructures the record *u* into a nameless set of (key, value) pairs

## Nested updates

A unique feature of LIGO is the ability to perform nested updates on records.

For example if you have the following record structure:
```
type color =
  Blue
| Green;

type preferences = {
  color : color,
  other : int
}

type account = {
  id : int,
  preferences : preferences
}
```

You can update the nested record with the following code:

```
let change_color_preference = (account : account, color : color): account =>
  { ...account, preferences.color: color };
```

## Your mission

<!-- prettier-ignore -->1- Refactor the type of *coordinates* as a record instead of a tuple. Name the parameters x, y and z.

<!-- prettier-ignore -->2- Refactor *earth\_coordinates* with the record type.

<!-- prettier-ignore -->2- Refactor the *modified\_earth\_coordinates* constant as a record (copy of *earth\_coordinates*) with its third component changed to *5*.
