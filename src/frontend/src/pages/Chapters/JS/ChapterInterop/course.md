# Chapter 26 : Interoperability with Michelson

<dialog character="pilot">Captain, some ressources are missing from our inventory, you should investigate.</dialog>

In this chapter, we will stress at the interoperability issue with Michelson which occurs when contracts are interacting between each other. We will see some built-in functions provided in the LIGO language in order to address this topic.

## Use case

Tezos smart contracts are written in Michelson language. The LIGO transpiler helps developers to produce Michelson scripts. However LIGO data structures might have different representations in Michelson. For this reason, some interoperability issues can occur when contracts communicate between each other.

### Multiple representations

LIGO allows to define a record (a structure containing many fields) but once transpiled in Michelson this record is transformed in a pair of pairs, and there can be many pairs of pairs representing the same record. Interoperability issues can occur because of this multiplicity of representation.

For example a record containing 3 fields A, B and C could be transpiled into right combed pairs :

 ```
( pair (int %a) ( pair (int %b) (int %c) ) )
 ```

or a left combed pairs :

 ```
( pair ( pair (int %a) (int %b) ) (int %c) )
 ```

These two representations have different structures.

When interacting with other contracts the representation (left or right combed) must be specified in order to match the required type of the invoked entrypoint. This is done by using some built-in functions of the LIGO language.

### Interacting with an other contract

In chapters 28 to 30,  we will see in detail the Financial Application standard (called FA2) which allows to create a standardized token contract. This FA2 token contract provides a *Transfer* entrypoint for transfering the token ownership between users. This entrypoint requires parameters that must respect a right combed representation of Ligo records.

<!-- prettier-ignore -->For example, if a third-party contract (called *Caller* contract) wants to interact with a FA2 token contract (called *token* contract), it would use the entrypoint *Transfer* which expects parameters with a right combed representation of Ligo records. So, when the *Caller* contract sends a transaction to the *token* contract, it must transform parameters of the called entrypoint into the expected representation.  

<!-- prettier-ignore -->The snippet of code below is part of the standard FA2 interface, and defines transfer parameters using *michelson\_pair\_right\_comb* function for specifying the Michelson representation used by the *Transfer* entrypoint.

```
type transferMichelson = michelson_pair_right_comb<transferAuxiliary>;
type transferParameter = list([transferMichelson]);
type parameter = ["Transfer", transferParameter];
```

We will see in detail the Financial Application standard in chapters 28 to 30.

Let's go deeper into the Michelson representation and related LIGO helper functions.

## Annotations

### Michelson types and annotations

Michelson types consist of *or*s and *pair*s, combined with field annotations. Field annotations add contraints on a Michelson type, for example a \_pair* of *(pair (int %foo) (string %bar))\_ will only work with the exact equivalence or the same type without the field annotations.

For example, the following _pair_

```
(pair (int %foo) (string %bar))
```

will accept these definitions and fail with the ones that does not respect the typing or the order of pair fields:

```
(pair (int %foo) (string %bar))       // OK
(pair int string)                     // OK
(pair (int %bar) (string %foo))       // KO
(pair (string %bar) (int %foo))       // KO
```

### Entrypoints and annotations

<!-- prettier-ignore -->As seen in the chapter Polymorphism, a contract can be called by another contract. The predefined function *Tezos.get\_entrypoint\_opt* allows to call a specific entry point of the called contract.

Here is an example. Let's consider the following "Counter" contract :

```
type storage = int;
type parameter =
  ["Left", int]
| ["Right", int];

const main = (param: parameter, x: storage) : [list<operation>, storage] => [
    list([]) as list<operation>,
    match(param, {
        Left: (i: int) => x + i,
        Right: (i: int) => x - i,
    })
];
```

The following contract sends a transaction to the "Counter" contract.

```
type storage = int;
type parameter = int;
type x = | ["Left", int];

const main = (_param: parameter, s: storage) : [list<operation>, storage] => {
    const contract: contract<x> =  match(Tezos.get_entrypoint_opt("%left", "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" as address) as option<contract<x>>, {
        Some: (c: contract<x>) => c,
        None: () => failwith("contract does not match")
    });
    return [ list([Tezos.transaction(Left(2), 2 as mutez, contract)]), s];
};
```

⚠️ Notice how we directly use the _%left_ entrypoint without mentioning the _%right_ entrypoint. This is done with the help of annotations. Without annotations it wouldn't be clear what our _int_ would be referring to.

These annotations work for *or*s or _variant_ types in LIGO.

## Interoperability with Michelson

<!-- prettier-ignore -->To interoperate with existing Michelson code or for compatibility with some development tooling, LIGO has two special interoperability types: *michelson\_or* and *michelson\_pair*. These types give the flexibility to model the exact Michelson output, including field annotations.

Take for example the following Michelson type that we want to interoperate with:

```
(or
  (unit %z)
  (or %other
    (unit %y)
    (pair %other
      (string %x)
      (pair %other
        (int %w)
        (nat %v)))))
```

To reproduce this type we can use the following LIGO code:

```
type w_and_v = michelson_pair<[int, "w", nat, "v"]>;
type x_and = michelson_pair<[string, "x", w_and_v, "other"]>;
type y_or = michelson_or<[unit, "y", x_and, "other"]>;
type z_or = michelson_or<[unit, "z", y_or, "other"]>;
```

If you don't want to have an annotation, you need to provide an empty string.

<!-- prettier-ignore -->To use variables of type *michelson\_or* you have to use *M\_left* and *M\_right*. *M\_left* picks the left _or_ case while *M\_right* picks the right _or_ case. For *michelson\_pair* you need to use tuples.

```
let z: z_or = M_left(unit) as z_or;

let y_1: y_or = M_left(unit) as y_or;
let y: z_or = M_right(y_1) as z_or;

let x_pair: x_and = ["foo", [2, 3 as nat]];
let x_1: y_or = M_right (x_pair) as y_or;
let x: z_or = M_right (y_1) as z_or;
```

## Default LIGO output#

By default LIGO translates its datatypes into a alphabetically left balanced tree. So, for example:

```
type animal = 
| ["Elephant"]
| ["Dog"]
| ["Cat"];
```

will translate to:

```
(or 
  (or 
    (unit %cat) 
    (unit %dog)
  )
  (unit %elephant) 
)
```

### Right combed tree output

If you want to change the data representation in Michelson to a location retaining right combed tree, like this:
```
  (or 
    (unit %elephant) 
    (or (unit %dog) 
        (unit %cat)
    )
  )
```

you can use the layout:comb attribute:

```
type animal =
// @layout:comb
| ["Elephant"]
| ["Dog"]
| ["Cat"];
```

The layout:comb attribute can also be used on record types:

```
type artist =  
// @layout:comb
{
  genre: string,
  since: timestamp,
  name: string
};
```



### Different Michelson annotations

If the Michelson annotation should be different from the LIGO representation, the annot:<string> attribute can be used. For example:

```
type animal = 
| /* @annot:memory */ ["Elephant"]
| /* @annot:face */ ["Dog"]
| /* @annot:fish */ ["Cat"]
```

will result into:

```
(or 
  (or 
    (unit %fish) 
    (unit %face)
  ) 
  (unit %memory)
)
```

The annot:<string> attribute can also be used on record field annotations:

```
type artist = {
  /* @annot:style */ genre: string,
  /* @annot:from */ since: timestamp,
  /* @annot:performer */ name: string
}
```

If the _layout:comb_ and _annot:<string>_ attributes are not adequate enough for your use case, LIGO has more advanced advanced interop features which we will we discuss next. 


### Manual data structure conversion

If you want to get your hands dirty, it's also possible to do manual data structure conversion.

The following code can be used as inspiration:

```
type z_to_v =
  ["Z"]
| ["Y"]
| ["X"]
| ["W"]
| ["V"];

type w_or_v = michelson_or<[unit, "w", unit, "v"]>;
type x_or = michelson_or<[unit, "x", w_or_v, "other"]>;
type y_or = michelson_or<[unit, "y", x_or, "other"]>;
type z_or = michelson_or<[unit, "z", y_or, "other"]>;

type test = {
  z: string,
  y: int,
  x: string,
  w: bool,
  v: int
};

let make_concrete_sum = (r: z_to_v): z_or =>
  match(r, {
    Z: () => M_left(unit) as z_or,
    Y: () => M_right(M_left(unit) as y_or) as z_or,
    X: () => M_right (M_right (M_left(unit) as x_or) as y_or) as z_or ,
    W: () => M_right (M_right (M_right(M_left(unit) as w_or_v) as x_or) as y_or) as z_or ,
    V: () => M_right (M_right (M_right(M_right(unit) as w_or_v) as x_or) as y_or) as z_or 
  });


let make_concrete_record = (r: test): [string, int, string, bool, int] =>
  [r.z, r.y, r.x, r.w, r.v];

let make_abstract_sum = (z_or: z_or): z_to_v =>
  match(z_or, {
    M_left: (n: unit) => Z(),
    M_right: (y_or: y_or) => {
      return match(y_or, {
        M_left: (n: unit) => Y(),
        M_right: (x_or: x_or) => {
          return match(x_or, {
            M_left: (n: unit) => X(),
            M_right: (w_or: w_or) => {
              return match(w_or, {
                M_left: (n: unit) => W(),
                M_right: (n: unit) => V()
              })
            }
          })
        }
      })
    }
  })

let make_abstract_record = (z: string, y: int, x: string, w: bool, v: int): test =>
  ({ z: z, y, x, w, v })
```

## Your mission

Here is a simple contract that changes the item stored in the storage. The contract possesses a single entry point _ChangeItem_.

<!-- prettier-ignore -->Take a look at the ligo command that compiles the storage to Michelson :

```
ligo compile storage exercise.jsligo "{ name: \"3\", item_id: 2 as nat, cost: 1 as nat }"
```

which outputs to:

```
(Pair 1 2 "3")
```

You need to create an _item_ type that will produces such output. Use the following storage from command below as a hint:

```
{ name: \"3\", item_id: 2 as nat, cost: 1 as nat }
```
