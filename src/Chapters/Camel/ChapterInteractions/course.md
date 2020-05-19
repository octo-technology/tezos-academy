# Chapter 20 : Interactions

<light />

<dialog character="alien">red alert the humans are here battle station surrender dirty humans or die we are the master of this universe and we will easily destroy you hahahaha</dialog>

A contract can invoke another by emiting a transaction operation at the end of an entrypoint.

## Transactions

We have already seen the _Tezos.transaction_ in chapter 17 in order to send money to an address. It is also possible to use _Tezos.transaction_ to call an entrypoint from another contract. In that case, we store the transaction in a type _operation_ which is a predefined type representing a contract invocation.

```
let <operation_name> : operation = Tezos.transaction <parameter> <mutez> <contract>
```

where :

- _parameter_ is the entrypoint to call on the target contract,
- _mutez_ is the amount to transfer,
- _contract_ is the contract we want to interact with.

To get the contract we want to call and its entry points, we can use :

```
Tezos.get_contract_opt <address>
```

The function take an address and return an optional _contract_ (remember to use _option_). When no contract is found or the contract doesn't match the type, _None_ is returned.

## Example

The following example shows how a contract can invoke another by emiting a transaction operation at the end of an entrypoint.
In our case, we have a _counter.ligo_ contract that accepts an action of type _parameter_, and we have a _proxy.ligo_ contract that accepts the same parameter type, and forwards the call to the deployed counter contract.

```
// counter.mligo

type parameter =
  Increment of nat
| Decrement of nat
| Reset

type return = operation list * int

 let main (p,s: action * int) : return =
  let storage =
    match p with
    | Increment n -> add (s, n)
    | Decrement n -> sub (s, n)
    | Reset -> 0
  in ([] : operation list), storage
```

```
// proxy.ligo

type parameter =
  Increment of nat
| Decrement of nat
| Reset

type storage = unit

type return = operation list * storage

let dest : address = ("KT19wgxcuXG9VH4Af5Tpm1vqEKdaMFpznXT3" : address)

let proxy (action, store : parameter * storage) : return =
  let counter : parameter contract =
    match (Tezos.get_contract_opt (dest) : parameter contract option) with
      Some contract -> contract
    | None -> (failwith "Contract not found." : parameter contract) in
  (* Reuse the parameter in the subsequent
     transaction or use another one, `mock_param`. *)
  let mock_param : parameter = Increment (5n) in
  let op : operation = Tezos.transaction action 0tez counter
  in [op], store
```

Notice that :

- the _proxy_ function has the specific prototype of a Main function.
- the _proxy_ function returns a list of operation containing the newly created transaction.
- the _parameter_ type (counter parameter) has also been defined in proxy contract. The calling contract must know the parameter type of called contract.

## Your mission

<!-- prettier-ignore -->1- Consider each of our weapons is managed by a smart contract  :

```
// weapon.ligo
type storage = int

type parameter =
  Fire of int
| Stop

type return = list (operation) * storage

let main (action, store : parameter * storage) : return is
 (([] : operation list),
  match action with
    Fire n -> n
  | Stop -> 0
 )
```

<!-- prettier-ignore -->2- Consider the contract in the editor. Notice the addresses of each weapon, and that the _orders_ function fetch the corresponding contracts. Your job is now to define the list of operations to send to the weapons. For this, start by creating _operations_ a list of type _operation_.

<!-- prettier-ignore -->3- Send a _Fire(5)_ transaction to the *right\_laser* contract, then _Stop_. Send a _Fire(5)_ transaction to the *left\_laser* contract, then _Stop_.
