# Chapter 21 : Polymorphism

<dialog character="pilot">The enemy is destroyed, great job Captain! Headquater is sending a reinforcement squadron to help us.</dialog>

When sending transactions between contracts, each contract must know the target contract interface and the parameter type of the target contract. This is done basically by separating type definition and function implementation and by using code inclusion.

But a problem arises when creating a new contract which must communicate way and back (two-way communication) with an already deployed contract. The deployed contract cannot know the signature of a contract not yet created !

<!-- prettier-ignore -->Fortunately a solution exists to this problem of polymorphism: the *Tezos.get\_entrypoint\_opt* function.

## Way and back communication between contracts

Let's consider two contracts _A_ and _B_. Contract _A_ asks some information from contract _B_ and they communicate between each other with transactions.
A sends a request to B, meanings _A_ calls an entry point of _B_, so contract _A_ includes type definition of _B_.
B receives the request, processes the request and sends a response back to _A_, meaning _B_ calls an entry point of _A_, so contract _B_ includes type definition of _A_.
Once they are deployed, we cannot change their _includes_.

Now let's consider a third smart contract _C_ which will communicate with _B_. (Like _A_)
Since we can't change _B_ (already deployed) , then _C_ must have the same definition of _A_ to be able to receive transactions from _B_.

The problem is coming from the fact that _B_ must know the whole definition of _A_ parameters but it actually only need one entry point used for the transaction. If _C_ implements the same entry point than _A_ (for receiving a message from _B_) then the transaction will match the entry point and solve our problem!

## Retrieving entry points

<!-- prettier-ignore -->For this purpose, the predefined function *Tezos.get\_entrypoint\_opt* can be used to retrieve the definition of a single entry point.

<!-- prettier-ignore -->The predefined function *Tezos.get\_entrypoint\_opt* can be used in replacement of the *Tezos.get\_contract\_opt* function to retrieve contract interface but for only one entry point. It takes the requested entry point as parameter (with a special Michelson syntax) and the address of the contract.

<!-- prettier-ignore -->The predefined function *Tezos.get\_entrypoint\_opt* has the following syntax :

```
const <variable_name>: option(contract(<type_of_target_contract_parameter>)) = Tezos.get_entrypoint_opt(<entrypoint_name>, <target_contract_address>);
```

<!-- prettier-ignore -->When the function *get\_entrypoint\_opt* does not find any contract at a given _address_ or the contract doesn't match the type, then _None_ is returned.

<!-- prettier-ignore -->As for the *Tezos.get\_contract\_opt* function, the *Tezos.get\_entrypoint\_opt* function returns an _option_ type.

## Entry point naming convention

<!-- prettier-ignore -->An entry point name is a double-quoted string where the first character is _%_ followed by the name of the entry point (and its first letter must not be capitalized), e.g. for an entry point *FooBar* the corresponding entry point name is *%fooBar*.

Entry point names are written in the form of: _%myEntryPoint_ for the entry point _MyEntryPoint_.

## Your mission

Consider the following smart contracts : Squadron and Central (Exercice).

The Central contract acts as an inventory of ships (an entry point _RegisterShip_ is provided to register a ship).
The Central contract can provide information of a ship to a calling contract via a callback transaction (an entry point _RetrieveShip_ is provided to query a ship).
The Squadron contract provides an entry point _ModuleRequest_ to ask for ship information to the central contract.
The Squadron contract provides an entry point _ModuleResponse_ which is called by the central contract when sending back the expected ship information.

As you can see, the entry point _RetrieveShip_ calls the function _sendTx_ which is responsible to send a transaction to a the calling contract. The implementation of the Central contract has not been finished. We need you to finish the _sendTx_ function!

<!-- prettier-ignore -->1- Try to retrieve the entry point %moduleResponse of the given *callbackAddress* and store the result in a variable called *contractInterfaceOpt* of type _option(contract(actionSquadron))_

<!-- prettier-ignore -->2- Use a _case_ operator to extract the entry point if it exists (use temporary variable name *ci* in the case). Otherwise throw an exception with error message "Entrypoint not found in contract Squadron". The extracted entry point must be stored in a variable called *contractInterface*.

<!-- prettier-ignore -->3- In order to prepare the ship information that need to be sent back to the Squadron contract. Check the expected type of entry point _moduleResponse_ and prepare a variable *ee* containing the expected ship *e*.

<!-- prettier-ignore -->4- Send a transaction to the retrieved entry point of the Squadron contract. The transaction must point to the _moduleResponse_ entrypoint of squadron contract and passing the right argument prepared in step 3. This transaction sends no money. The transaction is an _operation_ type that you can store in a variable *sendbackOperation*.
