# Chapter 20 : Interactions

<light />

<dialog character="alien">red alert the humans are here battle station surrender dirty humans or die we are the master of this universe and we will easily destroy you hahahaha</dialog>

A contract can invoke another by emiting a transaction operation at the end of an entrypoint.

## Syntax

The keyword _operation_ is a predefined type which model transaction (contract invocation).

The keyword _transaction_ is predefined function which generates an _operation_ from following parameters:

- target contract parameter (entrypoint call to execute on the target contract)
- amount to transfer
- the target contract interface (which describes possible entrypoints of targeted contract)

  _transaction_ function follows the syntax:

```
const <operation_name> : operation = Tezos.transaction(<target_contract_parameter>, <amount_tez_transfer>, <target_contract_interface>);
```

<!-- prettier-ignore -->The contract interface of an already deployed contract can be retrieved with the *get\_contract* function. It takes the address of the target contract and returns a contract interface. The _contract_ type is a template type which dpends on a the type of target contract parameter.

```
const <variable_name> : contract(<type_of_target_contract_parameter>) = Tezos.get_contract_opt(<target_contract_address>);
```

<!-- prettier-ignore -->Since a contract might be destroyed, the call to *Tezos.get\_contract\_opt* may not find the target contract. For a safer purpose, the function *get\_contract\_opt* is also available to retrieve a contract interface and work as *get\_contract* but returns an option of _contract(parameter)_

## Example

The following example shows how a contract can invoke another by emiting a transaction operation at the end of an entrypoint.
In our case, we have a counter.ligo contract that accepts an action of type parameter, and we have a proxy.ligo contract that accepts the same parameter type, and forwards the call to the deployed counter contract.

```
// counter.ligo

type storage is int

type parameter is
  Increment of int
| Decrement of int
| Reset

type return is list (operation) * storage

function main (const action : parameter; const store : storage) : return is
 ((nil : list (operation)),
  case action of
    Increment (n) -> store + n
  | Decrement (n) -> store - n
  | Reset         -> 0
 end)
```

```
// proxy.ligo

type parameter is
  Increment of nat
| Decrement of nat
| Reset

type storage is unit

type return is list (operation) * storage

const dest : address = ("KT19wgxcuXG9VH4Af5Tpm1vqEKdaMFpznXT3" : address)

function proxy (const action : parameter; const store : storage): return is
  block {
    const counter : contract (parameter) =
      case (Tezos.get_contract_opt (dest) : option (contract (parameter))) of
        Some (contract) -> contract
      | None -> (failwith ("Contract not found.") : contract (parameter))
      end;
    const mock_param : parameter = Increment (5n);
    const op : operation = Tezos.transaction (action, 0tez, counter);
    const ops : list (operation) = list [op]
  } with (ops, store)
```

Notice that :

- the _proxy_ function has the specific prototype of a Main function.
- the _proxy_ function returns a list of operation containing the newly created transaction.
- the _parameter_ type (counter parameter) has also been defined in proxy contract. The calling contract must know the parameter type of called contract.

## Polymorphism

When sending transactions between contracts, each contract must know the target contract interface and the parameter type of the target contract. This is done basicaly by separating type definition and function implementation and by using inclusion. But a problem arises when creating a new contract which must communicate way and back (two-way communication) with an already deployed contract. The deployed contract cannot know the signature of a contract not yet created!

<!-- prettier-ignore -->Hopefully a solution exists to this problem of polymorphism, it is *Tezos.get\_entrypoint\_opt* function.

Let's consider two contracts _A_ and _B_. Contract _A_ ask some information from contract _B_ and they communicate between each other with transactions.
A sends a request to B, (it means _A_ calls an entrypoint of _B_, so contract _A_ includes type definition of _B_)
B receives the request, process the request and sends an response back to _A_ (it means _B_ calls an entrypoint of _A_, , so contract _B_ includes type definition of _A_)
Once they are deployed, we cannot change their includes.

Now let's consider a third smart contract _C_ which will communicate with _B_. (Like _A_)
Since we can't change _B_ (already deployed) , then _C_ must have same definition of _A_ to be able to receive transactions from _B_.

The problem is coming from the fact that _B_ must know the whole definition of _A_ parameter but it actually only needs one entrypoint used for the transaction. If _C_ implements the same entrypoint than _A_ (for receiving a message from _B_) then transaction will match the entrypoint and problems solved !

<!-- prettier-ignore -->For this purpose, the predefined function *Tezos.get\_entrypoint\_opt* can be used to retrieve the definition of a single entrypoint (from the whole variant).

<!-- prettier-ignore -->The predefined function *Tezos.get\_entrypoint\_opt* can be used in replacement of the *Tezos.get\_contract\_opt* function to retrieve contract interface but for only one entrypoint. It takes the requested entrypoint as parameter (with a special michelson syntax) and the address of the contract.

```
const <variable_name>: contract(<type_of_target_contract_parameter>) = Tezos.get_entrypoint_opt(<entrypoint_name>, <target_contract_address>);
```

<!-- prettier-ignore --> *entrypoint\_name* is a double-quoted string with first character is % followed by the name of the entrypoint (and its first letter must not be capitalized) exemple: for an entrypoint FooBar the corresponding *entrypoint\_name* is "%fooBar"

## Your mission

<!-- prettier-ignore -->1- Consider the following smart contract :

```

```

<!-- prettier-ignore -->2-
