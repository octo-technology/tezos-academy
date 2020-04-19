# Chapter 14 : Built-ins

A LIGO smart contract can query part of the state of the Tezos blockchain by means of built-in values. In this section you will find how those built-ins can be utilized.

## Accepting or Declining Tokens in a Smart Contract

This example shows how Tezos.amount and failwith can be used to decline any transaction that sends more tez than 0tez, that is, no incoming tokens are accepted.

```
type parameter is unit
type storage is unit
type return is list (operation) \* storage

function deny (const action : parameter; const store : storage) : return is
if Tezos.amount > 0tez then
(failwith ("This contract does not accept tokens.") : return)
else ((nil : list (operation)), store)
```

Note that amount is deprecated. Please use Tezos.amount.

## Access Control

This example shows how Tezos.source can be used to deny access to an entrypoint.

```
const owner : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx": address);

function main (const action : parameter; const store : storage) : return is
if Tezos.source =/= owner then (failwith ("Access denied.") : return)
else ((nil : list (operation)), store)
```

Note that source is deprecated. Please use Tezos.source.

## Inter-Contract Invocations

It would be somewhat misleading to speak of "contract calls", as this wording may wrongly suggest an analogy between contract "calls" and function "calls". Indeed, the control flow returns to the site of a function call, and composed function calls therefore are stacked, that is, they follow a last in, first out ordering. This is not what happens when a contract invokes another: the invocation is queued, that is, follows a first in, first our ordering, and the dequeuing only starts at the normal end of a contract (no failure). That is why we speak of "contract invocations" instead of "calls".

The following example shows how a contract can invoke another by emiting a transaction operation at the end of an entrypoint.

The same technique can be used to transfer tokens to an implicit account (tz1, ...): all you have to do is use a unit value as the parameter of the smart contract.

In our case, we have a counter.ligo contract that accepts an action of type parameter, and we have a proxy.ligo contract that accepts the same parameter type, and forwards the call to the deployed counter contract.

```
// counter.ligo
type parameter is
Increment of nat
| Decrement of nat
| Reset

type storage is unit

type return is list (operation) \* storage
```

```
// proxy.ligo

type parameter is
Increment of nat
| Decrement of nat
| Reset

type storage is unit

type return is list (operation) \* storage

const dest : address = ("KT19wgxcuXG9VH4Af5Tpm1vqEKdaMFpznXT3" : address)

function proxy (const action : parameter; const store : storage): return is
block {
const counter : contract (parameter) =
case (Tezos.get*contract_opt (dest) : option (contract (parameter))) of
Some (contract) -> contract
| None -> (failwith ("Contract not found.") : contract (parameter))
end;

const mock_param : parameter = Increment (5n);
const op : operation = Tezos.transaction (action, 0tez, counter);
const ops : list (operation) = list [op]
} with (ops, store)
```

## Your mission

Coming soon ...
