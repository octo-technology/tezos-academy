# Chapter 21 : Polymorphism

<light />

<dialog character="pilot"></dialog>

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
const <variable_name>: option(contract(<type_of_target_contract_parameter>)) = Tezos.get_entrypoint_opt(<entrypoint_name>, <target_contract_address>);
```

<!-- prettier-ignore --> *entrypoint\_name* is a double-quoted string with first character is % followed by the name of the entrypoint (and its first letter must not be capitalized) exemple: for an entrypoint FooBar the corresponding *entrypoint\_name* is "%fooBar"

<!-- prettier-ignore --> To get a contract from an address and entrypoint, we can use _Tezos.get_entrypoint_opt(<entrypoint>, <address>)_

Entrypoints are written in the form of: _%myEntryPoint_ for the enty point _MyEntryPoint_. Notice we change the case of the first letter. When no contract is found or the contract doesn't match the type, _None_ is returned. Remember to use _option_ for the return type as it is optional.

## Your mission

<!-- prettier-ignore -->1- Consider the following smart contract :

```

```

<!-- prettier-ignore -->2- Complete
