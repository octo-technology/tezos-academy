# Chapter 19 : Option

<dialog character="mechanics">Captain, we should warm up the weapons while we are still in FTL, we don't know what awaits us on the other side.</dialog>

The _option_ type is a predefined variant type that is used to express whether there is a value of some type or none. This is especially useful when calling a partial function, that is, a function that is not defined for some inputs. In that case, the value of the option type would be _None_, otherwise _Some_ (_v_), where _v_ is some meaningful value of any type.

An example in arithmetic is the division operation:

```
let div = ([a, b]: [nat, nat]): option<nat> => {
  if(b == (0 as nat)){
    return (None() as option <nat>);
  } else {
    return (Some(a/b));
  };
};
```

## Option in Pattern matching

In the previous chapters, you've seen how to do pattern matching using the _match_ operator.
The keyword _Some_ can be used in a pattern matching to retrieve the value behind the _option_ variable.
The keyword _None_ can be used in a pattern matching to verify the _option_ variable has no value.

```
match(<variable>, {
  Some: (<value_name>) => <block_code>,
  None: => <block_code>
});
```

<!-- prettier-ignore -->_<block\_code>_ can be a single instruction or a _{}_
<!-- prettier-ignore -->_<value\_name>_ is a local variable name. _<value\_name>_ which holds the _option_ value and can be used inside the _<block\_code>_

Here is an example of _Map.find_opt_ operator returning an option type :

```
type expected_type = int;
type balance_type = map<nat, expected_type>;
const user_balances: balance_type = Map.literal(list([[1 as nat, 10]]));

const my_balance: option<expected_type> = Map.find_opt(1 as nat, user_balances);

match(my_balance, {
  Some: val => unit,
  None: () => failwith("Unknown user")
});
```

Here is an example of pattern matching resolving an _option_ type directly (useful when we just want to retrieve the value behind the optional) :

```
const my_balance2: expected_type = match(my_balance, {
  Some: val => val,
  None: () => failwith("Unknown user") as expected_type
});
```

<!-- prettier-ignore -->Notice the cast of _failwith_ instruction into an *expected\_type*

## Your mission

<!-- prettier-ignore --> 1- Notice the _weapons_ mapping which maps the name of each weapon to its corresponding input of power. We want to increase the power of the _Main Laser_ but mapping returns optional results as they might not be found in the mapping. Define the constant *main\_laser\_power* as an optional int from selecting _"Main Laser"_ from the _weapons_ mapping.

<!-- prettier-ignore --> 2- Writte a pattern matching for *main\_laser\_power*. If it exists, increase the power of the _"Main Laser"_ by 1 (use *i* as temporary matching variable). If it does not exist in the mapping, fail with _"Weapon not found"_
