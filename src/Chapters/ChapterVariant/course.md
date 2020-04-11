# Chapter 7.2 : Variants

## Description

A variant type is a user-defined or a built-in type (in case of options) that defines a type by cases, so a value of a variant type is either this, or that or... The simplest variant type is equivalent to the enumerated types found in Java, C++, JavaScript.

The "|" keyword allow to create variants. A variant is a user-defined type which can accept exclusively different types. The "|" operator can be understood as a "or" between types.

For example, here is how we define a coin as being either head or tail

```
type coin is Head | Tail
```

And here is how a variable (of variant type _coin_) is initialized with one of the two possible values.

```
const head : coin = Head
const tail : coin = Tail
```

Notice that all possibles values for a variant are capitalized (*Head*, *Tail*)

In this particular, possibles values (*Head*, *Tail*) carry no information beyond their names, so they are called constant constructors, but variants can carry some information.

## Syntax

The variant definition follows the syntax :
```
type <typename> is 
| <Label1> of <typeDefinition1>
| <Label2> of <typeDefinition2>
```

Types definitions (<typeDefinition>) refers to primitive type (nat, int,..) or predefined type such as unit or any other user custom types.

### unit

The unit type in Michelson or LIGO is a predefined type that contains only one value that carries no information. It is used when no relevant information is required or produced. Here is how it used.

In PascaLIGO, the unique value of the unit type is Unit.
```
const n : unit = Unit
```

(notice the capital letter for the value)

## Assignement

A variable can be define for a variant type <typename>, it follows the syntax:
```
const <variableName> : <typename> = <Label>(<Parameter>) | <Label>(<Parameter>) 
```


## Exemple

Here is a snippet of code that defines different type of users
```
type id is nat

type user is
  Admin   of id
| Manager of id
| Guest

const u : user = Admin (1000n)
const g : user = Guest
```

In LIGO, a constant constructor is equivalent to the same constructor taking an argument of type unit, so, for example, Guest is the same value as Guest (unit).


# Your mission

You received a laserbeam message from Interstellar Academy: "Today's lesson: space combat simulation - Attack / Defense"
Two ships are meeting around AlphaCentory, a space battle is about to begin ! It is time to choose your strategy: you can either fire on a ship or activate your electromagnetic shield.

<!-- prettier-ignore -->
We need a new type to model battle actions
1- In the Editor (first section), define a variant type named *battle\_action* which allows either an order of *Attack* with the _name_ of the targeted ship or an order of *Defense* (with no other information carried)
2- In the Editor (second section), define a variable *ship1_order* of type *battle\_action* which order to defend itself
3- In the Editor (second section), define a variable *ship2_order* of type *battle\_action* which order to attack _ship1_
