# Chapter 19 : Option

<dialog character="mechanics">Captain, we should warm up the weapons while we are still in FTL, we don't know what awaits us on the other side.</dialog>

The _option_ type is a predefined variant type that is used to express whether there is a value of some type or none. This is especially useful when calling a partial function, that is, a function that is not defined for some inputs. In that case, the value of the option type would be _None_, otherwise _Some_ (_v_), where _v_ is some meaningful value of any type.

An example in arithmetic is the division operation:

```
let div (a, b : nat * nat) : nat option =
  if b = 0n then (None: nat option) else Some (a/b)
```

## Initialization

The keyword _Some_ can be used to create an _option_ variable for a given value.
The keyword _None_ can be used to create an _option_ variable with no given value.

```
let middleName : string option = Some "Foo";
let noMiddleName : string option = None;
```

## Option in Pattern matching

In the previous chapters, you've seen how to do pattern matching using the _match with_ operator.
The keyword _Some_ can be used in a pattern matching to retrieve the value behind the _option_ variable.
The keyword _None_ can be used in a pattern matching to verify the _option_ variable has no value.

```
match <variable> with
  Some <value_name> -> <block_code>
| None -> <block_code>
```

<!-- prettier-ignore -->_<block\_code>_ can be a single instruction or a function call
<!-- prettier-ignore -->_<value\_name>_ is a local variable name. _<value\_name>_ which holds the _option_ value and can be used inside the _<block\_code>_

Here is an example of accessing maps returning an option type and retrieving the value behind the optional :

```
type expected_type = int
type balance_type = (nat, expected_type) map
let user_balances: balance_type = Map.literal[ (1n, 10) ]

let one_balance_opt : expected_type option = Map.find_opt 1n user_balances 
let user_balance : expected_type = match one_balance_opt with
  Some v -> v
| None -> (failwith ("Unknown user"): expected_type)
```

It can be written in a single constant instruction :

```
let my_balance : expected_type = match Map.find_opt 1n user_balances with
  Some v -> v
| None -> (failwith ("Unknown user") : expected_type)
```

<!-- prettier-ignore -->Notice the cast of _failwith_ instruction into an _expected\_type_

## Your mission

<!-- prettier-ignore --> 1- Notice the _weapons_ mapping which maps the name of each weapon to its corresponding input of power. We want to increase the power of the _Main Laser_ but mapping returns optional results as they might not be found in the mapping. Define the constant *main\_laser\_power\_opt* as an optional int from selecting _"Main Laser"_ from the _weapons_ mapping.

<!-- prettier-ignore --> 2- Create a constant *increased_weapons* representing the new weapon mapping and initialize it with a pattern matching on *main\_laser\_power\_opt*. If it exists, update *weapons* mapping by increasing the power of the _"Main Laser"_ by 1 (use *i* as temporary matching variable). If it does not exist in the mapping, fail with _"Weapon not found"_
