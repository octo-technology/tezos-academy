# Chapter 21 : Polymorphism

<light />

<dialog character="pilot"></dialog>

When sending transactions between contracts, each contract must know the target contract interface and the parameter type of the target contract. This is done basically by separating type definition and function implementation and by using inclusion. 

But a problem arises when creating a new contract which must communicate way and back (two-way communication) with an already deployed contract. The deployed contract cannot know the signature of a contract not yet created !

<!-- prettier-ignore -->Hopefully a solution exists to this problem of polymorphism, it is *Tezos.get\_entrypoint\_opt* function.

## Way and back communication between contracts

Let's consider two contracts _A_ and _B_. Contract _A_ ask some information from contract _B_ and they communicate between each other with transactions.
A sends a request to B, (it means _A_ calls an entry point of _B_, so contract _A_ includes type definition of _B_)
B receives the request, process the request and sends an response back to _A_ (it means _B_ calls an entry point of _A_, , so contract _B_ includes type definition of _A_)
Once they are deployed, we cannot change their includes.

Now let's consider a third smart contract _C_ which will communicate with _B_. (Like _A_)
Since we can't change _B_ (already deployed) , then _C_ must have same definition of _A_ to be able to receive transactions from _B_.

The problem is coming from the fact that _B_ must know the whole definition of _A_ parameter but it actually only needs one entry point used for the transaction. If _C_ implements the same entry point than _A_ (for receiving a message from _B_) then transaction will match the entry point and problems solved !

## Retrieving entry points

<!-- prettier-ignore -->For this purpose, the predefined function *Tezos.get\_entrypoint\_opt* can be used to retrieve the definition of a single entry point (from the whole variant).

<!-- prettier-ignore -->The predefined function *Tezos.get\_entrypoint\_opt* can be used in replacement of the *Tezos.get\_contract\_opt* function to retrieve contract interface but for only one entry point. It takes the requested entry point as parameter (with a special michelson syntax) and the address of the contract.

<!-- prettier-ignore -->The predefined function *Tezos.get\_entrypoint\_opt* has the following syntax :

```
let <variable_name>: option(contract(<type_of_target_contract_parameter>)) = Tezos.get_entrypoint_opt(<entrypoint_name>, <target_contract_address>);
```

<!-- prettier-ignore -->When function *get\_entrypoint\_opt* does not find any contract at  a given _address_ or the contract doesn't match the type, then  _None_ is returned. 

<!-- prettier-ignore -->As for *Tezos.get\_contract\_opt* function, *Tezos.get\_entrypoint\_opt* function returns an _option_ type. 


## Entry point naming convention

<!-- prettier-ignore --> Entry point name is a double-quoted string with first character is _%_ followed by the name of the entry point (and its first letter must not be capitalized) exemple: for an entry point *FooBar* the corresponding entry point name is *%fooBar*.

Entry point names are written in the form of: _%myEntryPoint_ for the entry point _MyEntryPoint_.  


## Entry point naming convention

<!-- prettier-ignore --> *entrypoint\_name* is a double-quoted string with first character is % followed by the name of the entry point (and its first letter must not be capitalized) exemple: for an entry point *FooBar* the corresponding *entrypoint\_name* is *"%fooBar"*

<!-- prettier-ignore --> To get a contract from an address and entry point, we can use _Tezos.get_entrypoint_opt(<entrypoint>, <address>)_

Entrypoints are written in the form of: _%myEntryPoint_ for the entry point _MyEntryPoint_. Notice we change the case of the first letter. 




## Your mission

Consider the following smart contracts : Squadron and Central. 

Central contract acts as an inventory of ships (an entry point *RegisterShip* is provided to register a ship).
Central contract can provide information of a ship to a calling contract via a callback transaction (an entry point *RetrieveShip* is provided to query a ship).
Squadron contract provides an entry point *ModuleRequest* to ask ship information to the central contract.
Squadron contract provides an entry point *ModuleResponse* which is called by the central contract when sending back the expected ship information.

As you can see, the entry point *RetrieveShip* calls the function *sendTx* which is responsible to send a transaction to a the calling contract. The implementation of Central contract has not been finished. We need you to finish the *sendTx* function !


<!-- prettier-ignore -->1- Try to retrieve the entry point %moduleResponse of the given *callbackAddress* and store the result in a variable called *contractInterfaceOpt* of type _option(contract(actionSquadron))_

<!-- prettier-ignore -->2- Use a _switch_ operator to extract the entry point if it exists (use temporary variable name *ci* in the switch). Otherwise throw an exception with error message "Entrypoint not found in contract Squadron". The extracted entry point must be stored in a variable called *contractInterface*.

<!-- prettier-ignore -->3- In order to prepare the ship information that need to be sent back to the Squadron contract. Check the expected type of entry point _moduleResponse_ and prepare a variable *ee* containing the expected ship *e*. 

<!-- prettier-ignore -->4- Send a transaction to the retrieved entry point of squadron contract. the transaction must point to the moduleResponse entrypoint of squadron contract and passing the right argument prepared in step 3. This transaction sends no money. The transaction is an _operation_ type that you can store in a variable *sendbackOperation*.

