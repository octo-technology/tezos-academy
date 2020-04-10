# Chapter 20 : Transactions

## Description

Tezos smart contract allows to interact with other contracts. 

It would be somewhat misleading to speak of "contract calls", as this wording may wrongly suggest an analogy between contract "calls" and function "calls". Indeed, the control flow returns to the site of a function call, and composed function calls therefore are stacked, that is, they follow a last in, first out ordering. This is not what happens when a contract invokes another: the invocation is queued, that is, follows a first in, first our ordering, and the dequeuing only starts at the normal end of a contract (no failure). That is why we speak of "contract invocations" instead of "calls".

A contract can invoke another by emiting a transaction operation at the end of an entrypoint. 

## Syntax

The keyword *operation* is a predefined type which model transaction (contract invocation).

The keyword *transaction* is predefined function which generates an _operation_ from following parameters:
- target contract parameter (entrypoint call to execute on the target contract)
- amount to transfer
- the target contract interface (which describes possible entrypoints of targeted contract)
 
 *transaction* function follows the syntax:

```
const <operation_name> : operation = transaction (<target_contract_parameter>, <amount_tez_transfer>, <target_contract_interface>);
```

The contract interface of an already deployed contract can be retrieved with the *get_contract* function. It takes the address of the target contract and returns a contract interface. The *contract* type is a template type which dpends on a the type of target contract parameter.

```
const <variable_name> : contract(<type_of_target_contract_parameter>) = get_contract(<target_contract_address>);
```

Since a contract might be destroyed, the call to *get_contract* may not find the target contract. For a safer purpose, the function *get_contract_opt* is also available to retrieve a contract interface and work as *get_contract* but returns an option of _contract(parameter)_


## Exemple

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
    (* Reuse the parameter in the subsequent
       transaction or use another one, `mock_param`. *)
    const mock_param : parameter = Increment (5n);
    const op : operation = Tezos.transaction (action, 0tez, counter);
    const ops : list (operation) = list [op]
  } with (ops, store)
```

Note that *proxy* function has the specific prototype of a Main function.
Note that the *proxy* function returns a list of operation containing the newly created transaction.
Note that *parameter* type (counter parameter) has also been defined in proxy contract. The calling contract must know the parameter type of called contract.

## Polymorphism

When sending transactions between contracts, each contract must know the target contract interface and the parameter type of the target contract. This is done basicaly by separating type definition and function implementation and by using inclusion. But a problem arises when creating a new contract which must communicate way and back (two-way communication) with an already deployed contract. The deployed contract cannot know the signature of a contract not yet created !

Hopefully a solution exists to this problem of polymorphism, it is *get_entrypoint* function.

### Polymorphism problem in detail

Let's consider two contracts _A_ and _B_. Contract _A_ ask some information from contract _B_ and they communicate between each other with transactions.
A sends a request to B, (it means _A_ calls an entrypoint of _B_, so contract _A_ includes type definition of _B_)
B receives the request, process the request and sends an response back to _A_ (it means _B_ calls an entrypoint of _A_, , so contract _B_ includes type definition of _A_)
Once they are deployed, we cannot change their includes.

Now let's consider a third smart contract _C_ which will communicate with _B_. (Like _A_)
Since we can't change _B_ (already deployed) , then _C_ must have same definition of _A_ to be able to receive transactions from _B_.

The problem is coming from the fact that _B_ must know the whole definition of _A_ parameter but it actually only needs one entrypoint used for the transaction. If _C_ implements the same entrypoint than _A_ (for receiving a message from _B_) then transaction will match the entrypoint and problems solved !
For this purpose, the predefined function *get_entrypoint* can be used to retrieve the definition of a single entrypoint (from the whole variant).

### get_entrypoint

The predefined function *get_entrypoint* can be used in replacement of the *get_contract* function to retrieve contract interface but for only one entrypoint. It takes the requested entrypoint as parameter (with a special michelson syntax) and the address of the contract. 

```
const <variable_name>: contract(<type_of_target_contract_parameter>) = get_entrypoint(<entrypoint_name>, <target_contract_address>);
```
<entrypoint_name> is a double-quoted string with first character is % followed by the name of the entrypoint (and its first letter must not be capitalized) exemple: for an entrypoint FooBar the corresponding entrypoint_name is "%fooBar"



# Your mission

Following the recent squarmishes around AlphaCentory, sadly tension is at its peak ! War is about to brake out. Some factions are joining the Interstellar Gov and others joining the "other side" whoever they are ... For the ones that are joining the Interstellar Gov, squadrons will be formed and dispatched in sector 13 for patrolling boarders. When your squadron is in contact with a ship, you will not know if the ship is an enemy or not, unless you contact *central* smart contract of the Interstellar Gov (which holds the *hostile* status of every ship). The communication between the squadron and the central is asynchronous and is done by sending transactions between *squadron* and *central* smart contract.

You are a blockchainer, we need you to write those smart contracts. If you refuse allied ships will be shooting to each other, that's something we can't afford !

<!-- prettier-ignore -->
Complete existing smart contract with following requests :

1- In file squadron.ligo 

1.1- Define a constant variable *proposed_destination* initialized with the contract interface of _central_ smart contract

1.2- Define a constant variable *actRetrieve* of type *actionRetrieve* for parameters passed along the transaction (ship name and squadron smart contract address)

1.3- Define a *proposedTransaction* variable initialized with a transaction creation based on previous variables (and transfering no mutez). The transaction must call the *RetrieveShip* entrypoint of _central_ smart contract.

2- In file central.ligo

2.1- Define a constant variable *contractInterface* initialized with the contract interface of the entrypoint *ModuleResponse* of _squadron_ smart contract (in order to allow polymorphism)

2.2- Define a constant variable *ee* of type *actionModuleResponse* for parameters passed along the transaction (ship entity)

2.3- Define a *sendbackOperation* variable initialized with a transaction creation based on previous variables (and transfering no mutez). The transaction must call the *ModuleResponse* entrypoint of _squadron_ smart contract.
