# Chapter 25 : Financial Asset 2.0 - Tranfer Hook

<dialog character="mechanics">Captain, all space pirate should have a hook like in old times.</dialog>

## ... in the previous episode 

The FA2 standard proposes a *unified token contract interface* that accommodates all mentioned concerns. It aims to provide significant expressivity to contract developers to create new types of tokens while maintaining a common interface standard for wallet integrators and external developers.

The FA2 interface formalize a standard way to design tokens and thus describes a list of entrypoints (that must be implemented) and data structures related to those entrypoints. 

In this chapter we will focus on _transfer hook_

### Transfer Hook

The FA2 standard proposes an approach in which a pluggable separate contract (permission transfer hook) is implemented and registered with the core FA2. Every time FA2 performs a transfer, it invokes a "hook" contract that validates a transaction and either approves it by finishing execution successfully or rejects it by failing.


#### definition

_Transfer hook_ is one recommended design pattern to implement FA2 that enables separation of the core token transfer logic and a permission policy.

Instead of implementing FA2 as a monolithic contract, a permission policy can be implemented as a separate contract. Permission policy contract provides an entry point invoked by the core FA2 contract to accept or reject a particular transfer operation (such an entry point is called *transfer hook*).

Although this approach introduces gas consumption overhead (compared to an all-in-one contract) by requiring an extra inter-contract call, it also offers some other advantages: 
1) FA2 core implementation can be verified once, and certain properties (not related to permission policy) remain unchanged.
2) modification of the permission policy of an existing contract can be done by replacing a transfer hook only. No storage migration of the FA2 ledger is required.
3) Transfer hooks could be used for purposes beyond permissioning, such as implementing _custom logic_ for a particular token application

The transfer hook makes it possible to model different transfer permission policies like whitelists, operator lists, etc.


#### Hook interface

The FA2 interface formalize a standard way to handle hooks.

```
type set_hook_param = {
  hook : unit -> transfer_descriptor_param_michelson contract;
  permissions_descriptor : permissions_descriptor;
}

type set_hook_param_aux = {
  hook : unit -> transfer_descriptor_param_michelson contract;
  permissions_descriptor : permissions_descriptor_michelson;
}

type set_hook_param_michelson = set_hook_param_aux michelson_pair_right_comb

type fa2_with_hook_entry_points =
  | Fa2 of fa2_entry_points
  | Set_transfer_hook of set_hook_param_michelson
```

In addition to the hook standard, the FA2 standard provides helper functions to manipulate data structures involved in FA2 interface. These helper function are packed in a FA2 library. (see section "FA2 standard hook library")

#### FA2 standard hook library

##### Register FA2 core with Hook permission contract

Some helpers functions has been gatthered in a hook library which help defining hooks when implementing a FA2 contract. This library contains following functions and type alias :

The type *fa2_registry* is a set of address. 

the function *get_hook_entrypoint* retrieves the contract interface of entrypoint "%tokens_transferred_hook" for a given contract address

the function *register_with_fa2* 
* takes the address of a FA2 contract (having hooks) and register it in the registry (set of address).
* calls the *Set_transfer_hook* entrypoint of a FA2 contract

the function *create_register_hook_op* sends a transaction to a FA2 contract (having hook entrypoints). The transaction intends to invoke the entrypoint *Set_transfer_hook*.  This entrypoint *Set_transfer_hook* requires as parameters : 
* the contract interface of entrypoint "%tokens_transferred_hook" 
* a _permission descriptor_

the function *validate_hook_call* ensures an address in registered in the registry (set of address).


##### Transfer Hooks

The function *owners_transfer_hook* defined in the library generates a list of Tezos operations invoking sender and receiver hooks according to
the policies defined by the permissions descriptor.


The hook pattern depends on the permission policy. A transfer hook may be unwanted, optional or required. 
If the policy requires a owner hook then the token owner contract MUST implement an entry point "tokens_received". Otherwise transfer is not allowed.
If the policy optionnaly accepts a owner hook then the token owner contract MAY implement an entry point "tokens_received". Otherwise transfer is allowed.

It is the same for permission policies including senders, the entry point *tokens_sent* may need to be implemented.

In case of a Transfer, if permission policies expect a hook, then the token owners MUST implement *fa2_token_receiver*, and *fa2_token_sender* interfaces. This implies that token'owner contract must have entry points *tokens_received* and *token_sent*. If these entry points fail the transfer is rejected. 


##### Transfer Hooks entry points
 
The library defines some helper functions

The function *to_receiver_hook* retrieves the entry point *"%tokens_received"* for a given _address_. It enables to check if the *fa2_token_receiver* interface is implemented.

The function *to_sender_hook* retrieves the entry point *"%tokens_sent"* for a given _address_. It enables to check if the *fa2_token_sender* interface is implemented.

These two functions return a variant *hook_result* type. If variant value is *Hook_contract* then the entrypoint exists an is provided. If variant value is Hook_undefined then the entry point is not implemented and a message error is provided.

```
type hook_result =
  | Hook_contract of transfer_descriptor_param_michelson contract
  | Hook_undefined of string
```



#### Hook Rules

FA2 implementation with the transfer hook pattern recquires following rules:

1) An FA2 token contract has a single entry point to set the hook. If a transfer hook is not set, the FA2 token contract transfer operation MUST fail. 

2) Transfer hook is to be set by the token contract administrator before any transfers can happen.

3) The concrete token contract implementation MAY impose additional restrictions on
who may set the hook. If the set hook operation is not permitted, it MUST fail
without changing existing hook configuration.

4) For each transfer operation, a token contract MUST invoke a transfer hook and
return a corresponding operation as part of the transfer entry point result.
(For more details see set_transfer_hook )

5) *operator* parameter for the hook invocation MUST be set to *SENDER*.

6) *from_* parameter for each hook_transfer batch entry MUST be set to *Some(transfer.from_)*.

7) *to_* parameter for each hook_transfer batch entry MUST be set to *Some(transfer.to_)*.

8) A transfer hook MUST be invoked, and operation returned by the hook invocation
MUST be returned by transfer entry point among other operations it might create.
*SENDER* MUST be passed as an operator parameter to any hook invocation. If an
invoked hook fails, the whole transfer transaction MUST fail.

9) FA2 does NOT specify an interface for mint and burn operations; however, if an
FA2 token contract implements mint and burn operations, these operations MUST
invoke a transfer hook as well.

#### Implementation of a hook permission contract

Let's see an example of FA2 Hook pattern implementation. The following smart contract implements a hook permission contract 

Owners transfer hooks are triggered by the *owners_transfer_hook* function.
If a receiver address implements *fa2_token_receiver* interface, its *tokens_received* entry point must be called.
If a sender address implements *fa2_token_sender* interface, its *tokens_sent* entry point must be called. 


```
(**
Implementation of a generic permission transfer hook that supports sender/receiver
hooks. Contract behavior is driven by the permissions descriptor value in the
contract storage and its particular settings for `sender` and `receiver` policies.
*)

#include "../lib/fa2_transfer_hook_lib.mligo"
#include "../lib/fa2_owner_hooks_lib.mligo"

type storage = {
  fa2_registry : fa2_registry;
  descriptor : permissions_descriptor;
}

type  entry_points =
  | Tokens_transferred_hook of transfer_descriptor_param_michelson
  | Register_with_fa2 of fa2_with_hook_entry_points contract

 let main (param, s : entry_points * storage) 
    : (operation list) * storage =
  match param with
  | Tokens_transferred_hook pm ->
    let p = transfer_descriptor_param_from_michelson pm in
    let u = validate_hook_call (Tezos.sender, s.fa2_registry) in
    let ops = owners_transfer_hook
      ({ligo_param = p; michelson_param = pm}, s.descriptor) in
    ops, s

  | Register_with_fa2 fa2 ->
    let op , new_registry = register_with_fa2 (fa2, s.descriptor, s.fa2_registry) in
    let new_s = { s with fa2_registry = new_registry; } in
    [op], new_s



(** example policies *)

(* the policy which allows only token owners to transfer their own tokens. *)
let own_policy : permissions_descriptor = {
  operator = Owner_transfer;
  sender = Owner_no_hook;
  receiver = Owner_no_hook;
  custom = (None : custom_permission_policy option);
}
```

Notice this Hook Permission contract contains an entry point *Register_with_fa2* to register with the FA2 core contract.

Notice this Hook Permission contract contains an entry point *Tokens_transferred_hook* triggered when FA2 core contract receive a transfer request. This entry point triggers the owner hook transfer (sending hooks to sender and receiver and waiting for their approval or rejection). 


## Your mission

We are working on a Fungible token which can handle multiple assets. We decided to implement a Hook pattern. A FA2 core contract handle all fa2 entry points (BalanceOf, Transfer, ...) and a hook permission contract which implements the validation of a transfer with some custom rules. 

1 - we want to accept a transfer if transfer receiver is registered in a whitelist. This whitelisting is done via a tranfer hook.

2 - we want to accept a transfer if transfer receiver implements *fa2_token_receiver* interface.

If a receiver address implements *fa2_token_receiver* interface, its *tokens_received* entry point must be called.


<!-- prettier-ignore -->Complete the hook permission smart contract by implementing our custom rules on receivers. Transfer is permitted if receiver address implements *fa2_token_receiver* interface OR a receiver address is in the receiver white list. 

<!-- prettier-ignore -->1- Find receiver hook - Check if a receiver _r_ implements *fa2_token_receiver* interface, using *to_receiver_hook* function and a _match_ operator.

<!-- prettier-ignore -->2- Retrieve hook - if the receiver _r_ implements *fa2_token_receiver* interface, introduce variable _h_ as hook entry point. 

<!-- prettier-ignore -->3- Prepare parameter - cast parameter _p_ into type *transfer_descriptor_param_to_michelson* and store the result in a new variable _pm_

<!-- prettier-ignore -->4- Call the entry point - create a variable _op_ of type *operation* which is a transaction sending variable _pm_ and no mutez to the retrieved entry point _h_

<!-- prettier-ignore -->5- Return transactions - add this newly created operation _op_ in the returned list of operation _ops_ (and return _ops_)

<!-- prettier-ignore -->6- if the receiver _r_ does not implement *fa2_token_receiver* interface, response of *to_receiver_hook* provided an error message with variable _err_.

<!-- prettier-ignore -->7- Check if receiver _r_ is registered in the whitelist _wl_. 

<!-- prettier-ignore -->8- If it is the case , everything is fine, just return the returned list of operation _ops_. 

<!-- prettier-ignore -->9- Otherwise throw an exception with _err_ message. Don't forget to cast the exception.

