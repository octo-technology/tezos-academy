# Chapter 19 : Option

<dialog character="mechanics">Captain, we should warm up the weapons while we are still in FTL, we don't know what awaits us on the other side.</dialog>

The _option_ type is a predefined variant type that is used to express whether there is a value of some type or none. This is especially useful when calling a partial function, that is, a function that is not defined for some inputs. In that case, the value of the option type would be _None_, otherwise _Some_ (_v_), where _v_ is some meaningful value of any type.

An example in arithmetic is the division operation:

```
let div = ((a, b) : (nat, nat)) : option (nat) =>
  if (b == 0n) { (None: option (nat)); } else { Some (a/b); };
```

## Initialization

The keyword _Some_ can be used to create an _option_ variable for a given value.
The keyword _None_ can be used to create an _option_ variable with no given value.

```
let middleName : string option = Some "Foo";
let noMiddleName : string option = None;
```

## Option in Pattern matching

In the previous chapters, you've seen how to do pattern matching using the _switch_ operator.
The keyword _Some_ can be used in a pattern matching to retrieve the value behind the _option_ variable.
The keyword _None_ can be used in a pattern matching to verify the _option_ variable has no value.

```
switch <variable> {
| Some (<value_name>) => <block_code>
| None => <block_code>
}
```

_<block_code>_ can be a single instruction or a _block {}_
_<value_name>_ is a local variable name. _<value_name>_ which holds the _option_ value and can be used inside the _<block_code>_

Here is an example of accessing maps returning an option type and retrieving the value behind the optional :

```
type expected_type = int
type balance_type = map(nat, expected_type)
let user_balances: balance_type = Map.literal ([ (1n, 10) ]);

let my_balance : option(expected_type) = Map.find_opt (1n, user_balances);
let bal : expected_type = switch (my_balance) {
| Some (v) => v 
| None => (failwith ("Unknown user") : expected_type)
};
```

Here is an example of pattern matching resolving an option type directly (usefull when we just want to retrieve the value behind the optional) :

```
let bal2 : expected_type = switch (Map.find_opt (1n, user_balances)) {
| Some (v) => v 
| None => (failwith ("Unknown user") : expected_type)
};
```

⚠️ Notice the cast of _failwith_ instruction into an _expected_type_

## Your mission

<!-- prettier-ignore --> 1- Notice the _weapons_ mapping which maps the name of each weapon to its corresponding input of power. We want to increase the power of the _Main Laser_ but mapping returns optional results as they might not be found in the mapping. Define the constant *main\_laser\_power* as an optional int from selecting _"Main Laser"_ from the _weapons_ mapping.

<!-- prettier-ignore --> 2- Writte a pattern matching for *main\_laser\_power*. If it exists, increase the power of the _"Main Laser"_ by 1 (use *i* as temporary matching variable). If it does not exist in the mapping, fail with _"Weapon not found"_
