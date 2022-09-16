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
type transferMichelson = michelson_pair_right_comb(transferAuxiliary);
type transferParameter = list(transferMichelson);
type parameter = 
| Transfer(transferParameter)
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
type storage = int

type parameter =
 | Left of int
 | Right of int

let main ((p, x): (parameter * storage)): (operation list * storage) =
  (([]: operation list), (match p with
  | Left i -> x - i
  | Right i -> x + i
  ))
```

The following contract sends a transaction to the "Counter" contract.

```
type storage = int

type parameter = int

type x = Left of int

let main (p, s: parameter * storage): operation list * storage = (
  let contract: x contract =
    match ((Tezos.get_entrypoint_opt "%left" ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx": address)): x contract option) with
    | Some c -> c
    | None -> (failwith "contract does not match": x contract)
  in
  (([
    Tezos.transaction (Left 2) 2mutez contract;
  ]: operation list), s)
)
```

⚠️ Notice how we directly use the _%left_ entry point without mentioning the _%right_ entry point. This is done with the help of annotations. Without annotations it wouldn't be clear what our _int_ would be referring to.

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
type w_and_v = (int, "w", nat, "v") michelson_pair
type x_and = (string, "x", w_and_v, "other") michelson_pair
type y_or = (unit, "y", x_and, "other") michelson_or
type z_or = (unit, "z", y_or, "other") michelson_or
```

If you don't want to have an annotation, you need to provide an empty string.

<!-- prettier-ignore -->To use variables of type *michelson\_or* you have to use *M\_left* and *M\_right*. *M\_left* picks the left _or_ case while *M\_right* picks the right _or_ case. For *michelson\_pair* you need to use tuples.

```
let z: z_or = (M_left (unit) : z_or)

let y_1: y_or = (M_left (unit): y_or)
let y: z_or = (M_right (y_1) : z_or)

let x_pair: x_and = ("foo", (2, 3n))
let x_1: y_or = (M_right (x_pair): y_or)
let x: z_or = (M_right (y_1) : z_or)
```

## Helper functions

Conversions from Ligo types to Michelson types require a precise knowledge of the representation of data structures.

So it becomes even more relevant with nested pairs because there are many possible decompositions of a record in pairs of pairs.

The following record structure

```
type l_record = {
  s: string;
  w: int;
  v: nat
}
```

can be transformed in a left combed data structure

```
 (pair %other
    (pair %other
      (string %s)
      (int %w)
    )
    (nat %v)
  )
```

or a right combed data structure

```
 (pair %other
   (string %s)
   (pair %other
     (int %w)
     (nat %v)
   )
 )
```

Converting between different LIGO types and data structures can happen in two ways. The first way is to use the provided layout conversion functions, and the second way is to handle the layout conversion manually.

### Converting left combed Michelson data structures

#### Pair

<!-- prettier-ignore -->Conversion between the Michelson type and record type is handled with functions *Layout.convert\_from\_left\_comb* and *Layout.convert\_to\_left\_comb*.

Here's an example of a left combed Michelson data structure using pairs:

```
 (pair %other
    (pair %other
      (string %s)
      (int %w)
    )
    (nat %v)
  )
```

Which could respond with the following record type:

```
type l_record = {
  s: string;
  w: int;
  v: nat
}
```

This snippet of code shows

<!-- prettier-ignore -->\* how to use *Layout.convert\_from\_left\_comb* to transform a Michelson type into a record type.
<!-- prettier-ignore -->\* how to use *Layout.convert\_to\_left\_comb* to transform a record type into a Michelson type.

```
type Michelson = l_record michelson_pair_left_comb

let of_michelson (f: michelson) : l_record =
  let p: l_record = Layout.convert_from_left_comb f in
  p

let to_michelson (f: l_record) : Michelson =
  let p = Layout.convert_to_left_comb (f: l_record) in
  p
```

#### Variant

<!-- prettier-ignore -->In the case of a left combed Michelson or a data structure, that you want to translate to a variant, you can use the *michelson\_or\_left\_comb* type.

```
type vari =
| Foo of int
| Bar of nat
| Other of bool

type r = vari michelson_or_left_comb
```

<!-- prettier-ignore -->And then use these types in *Layout.convert\_from\_left\_comb* or *Layout.convert\_to\_left\_comb*, similar to the pairs example above

```
let of_michelson_or (f: r) : vari =
  let p: vari = Layout.convert_from_left_comb f in
  p

let to_michelson_or (f: vari) : r =
  let p = Layout.convert_to_left_comb (f: vari) in
  p
```

### Converting left combed Michelson data structures

<!-- prettier-ignore -->You can almost use the same code as that for the left combed data structures, but with *michelson\_or\_right\_comb*, *michelson\_pair\_right\_comb*, *Layout.convert\_from\_right\_comb*, and *Layout.convert\_to\_left\_comb* respectively.

### Manual data structure conversion

If you want to get your hands dirty, it's also possible to do manual data structure conversion.

The following code can be used as inspiration:

```
type z_to_v =
| Z
| Y
| X
| W
| V

type w_or_v = (unit, "w", unit, "v") michelson_or
type x_or = (unit, "x", w_or_v, "other") michelson_or
type y_or = (unit, "y", x_or, "other") michelson_or
type z_or = (unit, "z", y_or, "other") michelson_or

type test = {
  z: string;
  y: int;
  x: string;
  w: bool;
  v: int;
}

let make_concrete_sum (r: z_to_v) : z_or =
  match r with
  | Z -> (M_left (unit) : z_or)
  | Y -> (M_right (M_left (unit): y_or) : z_or )
  | X -> (M_right (M_right (M_left (unit): x_or): y_or) : z_or )
  | W -> (M_right (M_right (M_right (M_left (unit): w_or_v): x_or): y_or) : z_or )
  | V -> (M_right (M_right (M_right (M_right (unit): w_or_v): x_or): y_or) : z_or )

let make_concrete_record (r: test) : (string * int * string * bool * int) =
  (r.z, r.y, r.x, r.w, r.v)

let make_abstract_sum (z_or: z_or) : z_to_v =
  match z_or with
  | M_left n -> Z
  | M_right y_or ->
    (match y_or with
    | M_left n -> Y
    | M_right x_or -> (
        match x_or with
        | M_left n -> X
        | M_right w_or -> (
            match w_or with
            | M_left n -> W
            | M_right n -> V)))

let make_abstract_record (z: string) (y: int) (x: string) (w: bool) (v: int) : test =
  { z = z; y = y; x = x; w = w; v = v }
```

## Your mission

Here is a simple contract that changes the item stored in the storage. The contract possesses a single entry point _ChangeItem_.

<!-- prettier-ignore -->Take a look at the ligo command that compiles the storage to Michelson :

```
docker run --rm -v "$PWD":"$PWD" -w "$PWD" ligolang/ligo:next compile storage exercise.mligo '{ name= "3"; item_id= 2n; cost= 1n }'
```

which outputs to:

```
(Pair 1 2 "3")
```

You need to create an _item_ type that will produces such output. Use the following storage from command below as a hint:

```
{ name= "3"; item_id= 2n; cost= 1n }
```
