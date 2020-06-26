# Chapter 26 : Interoperability with Michelson

<dialog character="alien">We need to hack aliens, decompile their code to understand how their informatic works </dialog>


LIGO can work together with other smart contract languages on Tezos. However data structures might have different representations in Michelson and not correctly match the standard LIGO types. 

## Annotations

### Michelson types and annotations

Michelson types consist of *or*'s and *pair*'s, combined with field annotations. Field annotations add contraints on a Michelson type, for example a _pair_ of *(pair (int %foo) (string %bar))* will only work with the exact equivalence or the same type without the field annotations.

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

<!-- prettier-ignore -->As seen in chapter Polymorphism, a contract can be called by another contract. Using the predefined function *Tezos.get\_entrypoint\_opt* allows to a calling contract ot point to a specific entry point of the called contract. 

Here is an exemple. Let's consider the following "Counter" contract :

```
type storage = int

type parameter = 
 | Left(int)
 | Right(int)

let main = ((p, x): (parameter, storage)): (list(operation), storage) => {
  ([]: list(operation), (switch(p) {
  | Left(i) => x - i
  | Right(i) => x + i
  }))
};
```

Thre following contract sends a transaction to the "Counter" contract.

```
type storage = int;

type parameter = int;

type x = Left(int);

let main = ((p, s): (parameter, storage)): (list(operation), storage) => {
  let contract: contract(x) = 
    switch (Tezos.get_entrypoint_opt("%left", ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx": address)): option(contract(x))) {
      | Some c => c
      | None => (failwith ("contract does not match"): contract(x))
    };
  ([
    Tezos.transaction(Left(2), 2mutez, contract)
  ]: list(operation), s);
};
```

⚠️ Notice how we directly use the *%left* entrypoint without mentioning the *%right* entrypoint. This is done with the help of annotations. Without annotations it wouldn't be clear what our int would be referring to.

These annotations works for _or_'s or _variant_ types in LIGO.

## Interop with Michelson

<!-- prettier-ignore -->To interop with existing Michelson code or for compatibility with certain development tooling, LIGO has two special interop types: *michelson\_or* and *michelson\_pair*. These types give the flexibility to model the exact Michelson output, including field annotations.

Take for example the following Michelson type that we want to interop with:
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
type w_and_v = michelson_pair(int, "w", nat, "v")
type x_and = michelson_pair(string, "x", w_and_v, "other")
type y_or = michelson_or(unit, "y", x_and, "other")
type z_or = michelson_or(unit, "z", y_or, "other")
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

Conversions from Ligo types to michelson types requires a precise knowledge of data structures representation.

So it becomes even more relevant with nested pairs that there are many possible decomposition of a record in pairs of pairs. 

The following record structure

```
type l_record = {
  s: string,
  w: int,
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

<!-- prettier-ignore -->Conversion between the Michelson type and record type is handled with the functions *Layout.convert\_from\_left\_comb* and *Layout.convert\_to\_left\_comb*.

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
  s: string,
  w: int,
  v: nat
}
```

This snippet of code shows 
<!-- prettier-ignore -->* how to use *Layout.convert\_from\_left\_comb* to transform a michelson type into a record type.
<!-- prettier-ignore -->* how to use *Layout.convert\_to\_left\_comb* to transform a record type into a michelson type.

```
type michelson = michelson_pair_left_comb(l_record);

let of_michelson = (f: michelson) : l_record => { 
  let p: l_record = Layout.convert_from_left_comb(f);
  p
};

let to_michelson = (f: l_record) : michelson => {
  let p = Layout.convert_to_left_comb(f: l_record);
  p
}
```

#### Variant
<!-- prettier-ignore -->In the case of a left combed Michelson or data structure, that you want to translate to a variant, you can use the *michelson\_or\_left\_comb* type.

```
type vari = 
| Foo(int)
| Bar(nat)
| Other(bool)

type r = michelson_or_left_comb(vari)
```

<!-- prettier-ignore -->And then use these types in *Layout.convert\_from\_left\_comb* or *Layout.convert\_to\_left\_comb*, similar to the pairs example above

```
let of_michelson_or = (f: r) : vari => { 
  let p: vari = Layout.convert_from_left_comb(f);
  p
};

let to_michelson_or = (f: vari) : r => {
  let p = Layout.convert_to_left_comb(f: vari);
  p
}
```

### Converting left combed Michelson data structures

<!-- prettier-ignore -->you can almost use the same code as that for the left combed data structures, but with *michelson\_or\_right\_comb*, *michelson\_pair\_right\_comb*, *Layout.convert\_from\_right\_comb*, and *Layout.convert\_to\_left\_comb* respectively.

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

type w_or_v = michelson_or(unit, "w", unit, "v")
type x_or = michelson_or(unit, "x", w_or_v, "other")
type y_or = michelson_or(unit, "y", x_or, "other")
type z_or = michelson_or(unit, "z", y_or, "other")

type test = {
  z: string,
  y: int,
  x: string,
  w: bool,
  v: int
}

let make_concrete_sum = (r: z_to_v) : z_or =>
  switch(r){
  | Z => (M_left (unit) : z_or)
  | Y => (M_right (M_left (unit): y_or) : z_or )
  | X => (M_right (M_right (M_left (unit): x_or): y_or) : z_or )
  | W => (M_right (M_right (M_right (M_left (unit): w_or_v): x_or): y_or) : z_or )
  | V => (M_right (M_right (M_right (M_right (unit): w_or_v): x_or): y_or) : z_or )
  }

let make_concrete_record = (r: test) : (string, int, string, bool, int) =>
  (r.z, r.y, r.x, r.w, r.v)  

let make_abstract_sum = (z_or: z_or) : z_to_v =>
  switch (z_or) {
  | M_left n => Z
  | M_right y_or => (
    switch (y_or) {
    | M_left n => Y
    | M_right x_or => (
        switch (x_or) {
        | M_left n => X
        | M_right w_or => (
            switch (w_or) {
            | M_left n => W
            | M_right n => V
            })
        })
    })
  }


let make_abstract_record = (z: string, y: int, x: string, w: bool, v: int) : test =>
  { z : z, y, x, w, v }
  
```



## Your mission

We want you to modify our "inventory" contract. As you can see the storage is mainly composed of an item inventory where each item is a right combed nested pairs. The contract possess a single entry point AddInventory. This *AddInventory* function adds each element in the inventory (don't worry about duplicates it has already been taken care of).

<!-- prettier-ignore -->1- Complete the implementation of the *update_inventory* lambda function. This function takes a list of item as parameter and must transform each item in a combed pair structure and add this transformed structure in the storage inventory. (When naming your temporary variables, use *acc* for the accumulator name and *i* for the current item)

