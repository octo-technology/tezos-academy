# Chapter 19 : Pattern matching

## Option

The _option_ type is a predefined variant type that is used to express whether there is a value of some type or none. This is especially useful when calling a partial function, that is, a function that is not defined for some inputs. In that case, the value of the option type would be _None_, otherwise _Some_ (_v_), where _v_ is some meaningful value of any type.

An example in arithmetic is the division operation:

```
function div (const a : nat; const b : nat) : option (nat) is
  if b = 0n then (None: option (nat)) else Some (a/b)
```

## Map Access and Option evaluation

Use the postfix [] operator to read a value of the map. When accessing to an element of a map (using [] operator), the returned result is the associated value or _None_ if the given key does not exist. This is the reason why the [] operator returns an _option_ of the expected type (and not just the expected type).

the keyword _Some_ can be used to create an _option_ variable for a given value.
the keyword _None_ can be used to create an _option_ variable with no given value.

```
const user_balance: option(int) = Some(2);
const user_balance2: option(int) = None;
```

## Pattern matching

Pattern matching is similiar to the switch construct in Javascript, and can be used to route the program's control flow based on the value of a variant.
The keyword _case_ allow to execute different blocks of code depending on a value. It follwos the syntax :

```
case <value> of
| <Label>(<value_name>) -> <block_instruction>
...
end
```

_<value_name>_ which holds the _<Label>_ _parameter_ and can be used inside the _<block_instruction>_

the keyword _Some_ can be used in a pattern matching to retrieve the value behind the _option_ variable.
the keyword _None_ can be used in a pattern matching to verify the _option_ variable has no value.

### exemple

for example here is the definition of a function _flip_ that flips a coin.

```
type coin is Head | Tail

function flip (const c : coin) : coin is
  case c of
    Head -> Tail
  | Tail -> Head
  end
```

### Pattern matching with option

Using pattern matching with an _option_ variable follows this syntax :

```
case <variable> of
| Some(<value_name>) -> <block_code>
| None -> <block_code>
end
```

_<block_code>_ can be a single instruction or a _block {}_
_<value_name>_ is a local variable name. _<value_name>_ which holds the _option_ value and can be used inside the _<block_code>_

## Exemple

Here is an example of [] operator returning an option type :

```
type expected_type is int
type balance_type is map(nat, expected_type)
const user_balances: balance_type = map[ 1n -> 10 ];

const my_balance : option(expected_type) = user_balances[1n];
case my_balance of
  Some (val) -> block { skip }
| None -> failwith ("Unknown user")
end
```

## Your mission

Unannoucement of the Interstellar Government ! Due to pollution the Interstellar legislation commity has declared a restriction on number of access to space from earth. Each certified ship has been registered in the central register and some access has been allowed. If a ship is not written in the central register, it is not allowed to launch. When a ship launches from earth, its number of access is decreased.

We need a smart contract to apply those new rules !

<!-- prettier-ignore -->
1- Create a constant variable *galactica_id* and assign the number of access left for Galactica battleship.
2- Use pattern matching on variable *galactica_id* to throw an exception with message "Ship not registered" if the ship is not registered, and if ship is registered then decrease the number of access by 1
