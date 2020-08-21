# Chapter 30 : FA 2.0 - Tranfer Hook

<dialog character="mechanics">Captain, all space pirate should have a hook like in old times.</dialog>

## ... in the previous episode

The FA2 standard proposes a _unified token contract interface_ that accommodates all mentioned concerns. It aims to provide significant expressivity to contract developers to create new types of tokens while maintaining a common interface standard for wallet integrators and external developers.

The FA2 interface formalize a standard way to design tokens and thus describes a list of entrypoints (that must be implemented) and data structures related to those entrypoints.

In this chapter we will focus on _transfer hook_

### Transfer Hook

The FA2 standard proposes an approach in which a pluggable separate contract (permission transfer hook) is implemented and registered with the core FA2. Every time FA2 performs a transfer, it invokes a "hook" contract that validates a transaction and either approves it by finishing execution successfully or rejects it by failing.

Although, it is recommended to implement "transfer hook design pattern" in many cases this pattern is prohibitively expensive in terms of gas cost due to extra inter-contract calls.

#### Definition

_Transfer hook_ is one recommended design pattern to implement FA2 that enables separation of the core token transfer logic and a permission policy.

Instead of implementing FA2 as a monolithic contract, a permission policy can be implemented as a separate contract. Permission policy contract provides an entry point invoked by the core FA2 contract to accept or reject a particular transfer operation (such an entry point is called _transfer hook_).

![](/images/small-fa2-hook.png)

Although this approach introduces gas consumption overhead (compared to an all-in-one contract) by requiring an extra inter-contract call, it also offers some other advantages:

1. FA2 core implementation can be verified once, and certain properties (not related to permission policy) remain unchanged.
2. modification of the permission policy of an existing contract can be done by replacing a transfer hook only. No storage migration of the FA2 ledger is required.
3. Transfer hooks could be used for purposes beyond permissioning, such as implementing _custom logic_ for a particular token application

The transfer hook makes it possible to model different transfer permission policies like whitelists, operator lists, etc.

#### Hook interface

The FA2 interface formalize a standard way to handle hooks.

```
type set_hook_param is record [
  hook : (unit) -> contract(transfer_descriptor_param);
  permissions_descriptor : permissions_descriptor_;
]

type set_hook_param_aux is record [
  hook : (unit) -> contract(transfer_descriptor_param);
  permissions_descriptor : permissions_descriptor;
]

type set_hook_param_michelson is michelson_pair_right_comb(set_hook_param_aux)

type fa2_with_hook_entry_points is
    Fa2 of fa2_entry_points
  | Set_transfer_hook of set_hook_param_michelson

```

In addition to the hook standard, the FA2 standard provides helper functions to manipulate data structures involved in FA2 interface. These helper function are packed in a FA2 library. (see section "FA2 standard hook library")

#### FA2 standard hook library

##### Register FA2 core with Hook permission contract

Some helpers functions has been gatthered in a hook library which help defining hooks when implementing a FA2 contract. This library contains following functions and type alias :

<!-- prettier-ignore -->The type *fa2\_registry* is a _set_ of _address_.

<!-- prettier-ignore -->the function *get\_hook\_entrypoint* retrieves the contract interface of entrypoint "%tokens\_transferred\_hook" for a given contract address

<!-- prettier-ignore -->the function *register\_with\_fa2*
<!-- prettier-ignore -->* takes the address of a FA2 contract (having hooks) and register it in the registry (set of address).
<!-- prettier-ignore -->* calls the *Set\_transfer\_hook* entrypoint of a FA2 contract

<!-- prettier-ignore -->the function *create\_register\_hook\_op* sends a transaction to a FA2 contract (having hook entrypoints). The transaction intends to invoke the entrypoint *Set\_transfer\_hook*.  This entrypoint *Set\_transfer\_hook* requires as parameters :
<!-- prettier-ignore -->* the contract interface of entrypoint "%tokens\_transferred\_hook"
<!-- prettier-ignore -->* a _permission descriptor_

<!-- prettier-ignore -->the function *validate\_hook\_call* ensures an address in registered in the registry (set of address).

##### Transfer Hooks

<!-- prettier-ignore -->The function *owners\_transfer\_hook* defined in the library generates a list of Tezos operations invoking sender and receiver hooks according to the policies defined by the permissions descriptor.

The hook pattern depends on the permission policy. A transfer hook may be unwanted, optional or required.

<!-- prettier-ignore -->If the policy requires a owner hook then the token owner contract MUST implement an entry point "tokens\_received". Otherwise transfer is not allowed.
<!-- prettier-ignore -->If the policy optionally accepts a owner hook then the token owner contract MAY implement an entry point "tokens\_received". Otherwise transfer is allowed.

It is the same for permission policies including senders, the entry point _tokens_sent_ may need to be implemented.

<!-- prettier-ignore -->In case of a Transfer, if permission policies expect a hook, then the token owners MUST implement *fa2\_token\_receiver*, and *fa2\_token\_sender* interfaces. This implies that token'owner contract must have entry points *tokens\_received* and *token\_sent*. If these entry points fail the transfer is rejected.

##### Transfer Hooks entry points

The library defines some helper functions

<!-- prettier-ignore -->The function *to\_receiver\_hook* retrieves the entry point *"%tokens\_received"* for a given _address_. It enables to check if the *fa2\_token\_receiver* interface is implemented.

<!-- prettier-ignore -->The function *to\_sender\_hook* retrieves the entry point *"%tokens\_sent"* for a given _address_. It enables to check if the *fa2\_token\_sender* interface is implemented.

//// NOT IMPLEMENTED START///

<!-- prettier-ignore -->These two functions return a variant *hook\_result* type. If variant value is *Hook\_contract* then the entrypoint exists an is provided. If variant value is *Hook\_undefined* then the entry point is not implemented and a message error is provided.

```
type hook_result =
  | Hook_contract of transfer_descriptor_param_michelson contract
  | Hook_undefined of string
```

//// NOT IMPLEMENTED END///

#### Hook Rules

FA2 implementation with the transfer hook pattern recquires following rules:

1. An FA2 token contract has a single entry point to set the hook. If a transfer hook is not set, the FA2 token contract transfer operation MUST fail.

2. Transfer hook is to be set by the token contract administrator before any transfers can happen.

3. The concrete token contract implementation MAY impose additional restrictions on
   who may set the hook. If the set hook operation is not permitted, it MUST fail
   without changing existing hook configuration.

4. For each transfer operation, a token contract MUST invoke a transfer hook and
return a corresponding operation as part of the transfer entry point result.
<!-- prettier-ignore -->(For more details see set\_transfer\_hook )

5. _operator_ parameter for the hook invocation MUST be set to _SENDER_.

<!-- prettier-ignore -->6) *from_* parameter for each *hook\_transfer* batch entry MUST be set to *Some(transfer.from_)*.

<!-- prettier-ignore -->7) *to_* parameter for each *hook\_transfer* batch entry MUST be set to *Some(transfer.to_)*.

8. A transfer hook MUST be invoked, and operation returned by the hook invocation
   MUST be returned by transfer entry point among other operations it might create.
   _SENDER_ MUST be passed as an operator parameter to any hook invocation. If an
   invoked hook fails, the whole transfer transaction MUST fail.

9. FA2 does NOT specify an interface for mint and burn operations; however, if an
   FA2 token contract implements mint and burn operations, these operations MUST
   invoke a transfer hook as well.

#### Implementation of a hook permission contract

Let's see an example of FA2 Hook pattern implementation. The following smart contract implements a hook permission contract

<!-- prettier-ignore -->Owners transfer hooks are triggered by the *owners\_transfer\_hook* function.
<!-- prettier-ignore -->If a receiver address implements *fa2\_token\_receiver* interface, its *tokens\_received* entry point must be called.
<!-- prettier-ignore -->If a sender address implements *fa2\_token\_sender* interface, its *tokens\_sent* entry point must be called.

```
(**
Implementation of a generic permission transfer hook that supports sender/receiver
hooks. Contract behavior is driven by the permissions descriptor value in the
contract storage and its particular settings for `sender` and `receiver` policies.
*)
#include "tzip-12/lib/fa2_transfer_hook_lib.ligo"
#include "tzip-12/lib/fa2_hooks_lib.ligo"

type storage is record [
  fa2_registry : fa2_registry;
  descriptor : permissions_descriptor;
]

type  entry_points is
  | Tokens_transferred_hook of transfer_descriptor_param
  | Register_with_fa2 of contract(fa2_with_hook_entry_points)

function tokens_transferred_hook(const pm : transfer_descriptor_param; const s : storage) : list(operation) * storage is
block {
    const p : transfer_descriptor_param_ = Layout.convert_to_right_comb (pm);
    const u : unit = validate_hook_call (Tezos.sender, s.fa2_registry);
    const ops : list(operation) = owners_transfer_hook(record [ligo_param = p; michelson_param = pm], s.descriptor);
} with (ops, s)

function register(const fa2 : contract(fa2_with_hook_entry_points); const s : storage) : list(operation) * storage is
block {
   const ret : list(operation) * set(address) = register_with_fa2 (fa2, s.descriptor, s.fa2_registry);
    s.fa2_registry := ret.1;
} with (list [ret.0], s)

function main (const param : entry_points; const s : storage) : list(operation) * storage is
 block { skip } with
  case param of
  | Tokens_transferred_hook (pm) -> tokens_transferred_hook(pm, s)
  | Register_with_fa2 (fa2) -> register(fa2, s.descriptor, s.fa2_registry)
end

(** example policies *)

(* the policy which allows only token owners to transfer their own tokens. *)
const own_policy : permissions_descriptor = record [
  operator = Layout.convert_to_right_comb(Owner_transfer);
  sender = Layout.convert_to_right_comb(Owner_no_hook);
  receiver = Layout.convert_to_right_comb(Owner_no_hook);
  custom = (None : option(custom_permission_policy));
]
```

<!-- prettier-ignore -->Notice this Hook Permission contract contains an entry point *Register\_with\_fa2* to register with the FA2 core contract.

<!-- prettier-ignore -->Notice this Hook Permission contract contains an entry point *Tokens\_transferred\_hook* triggered when FA2 core contract receive a transfer request. This entry point triggers the owner hook transfer (sending hooks to sender and receiver and waiting for their approval or rejection).

## Your mission

We are working on a Fungible token which can handle multiple assets. We decided to implement a Hook pattern. A FA2 core contract handle all fa2 entry points (BalanceOf, Transfer,...) and a hook permission contract which implements the validation of a transfer with some custom rules.

![](/images/small-fa2-hook-exercise.png)

Rule 1 - we want to accept a transfer if transfer receiver is registered in a whitelist. This whitelisting is done via a tranfer hook.

<!-- prettier-ignore -->Rule 2 - we want to accept a transfer if transfer receiver implements *fa2\_token\_receiver* interface.

<!-- prettier-ignore -->If a receiver address implements *fa2\_token\_receiver* interface, its *tokens\_received* entry point must be called.

<!-- prettier-ignore -->Complete the hook permission smart contract by implementing our custom rules on receivers. Transfer is permitted if receiver address implements *fa2\_token\_receiver* interface OR a receiver address is in the receiver white list.

<!-- prettier-ignore -->- As you can see the function *check\_receiver* verifies if a receiver _r_ implements *fa2\_token\_receiver* interface, using *to\_receiver\_hook* function and a _case_ operator. If the receiver _r_ implements *fa2\_token\_receiver* interface, the function *create\_hook\_receiver\_operation* is called with _h_ as hook entry point.

<!-- prettier-ignore -->1 - Prepare parameter - cast parameter _p_ into type *transfer\_descriptor\_param* and store the result in a new variable _pm_. You can check the *fa2\_interface.ligo* for type definition of *transfer\_descriptor\_param* and use the *Layout.convert\_to\_right\_comb* function for conversion.

<!-- prettier-ignore -->2- Call the entry point - create a variable _op_ of type *operation* which is a transaction sending variable _pm_ and no mutez to the retrieved hook entry point _h_

<!-- prettier-ignore -->3- Return transactions - add this newly created operation _op_ in the returned list of operation _ops_ and return it.

<!-- prettier-ignore -->- if the receiver _r_ does not implement *fa2\_token\_receiver* interface, the function *verify\_receiver\_in\_whitelist* is called. Modify function *verify\_receiver\_in\_whitelist* with following implementation requirements:

<!-- prettier-ignore -->4- Check if receiver _r_ is registered in the whitelist _wl_.

<!-- prettier-ignore -->5- If it is the case , everything is fine, just return the returned list of operation _ops_.

<!-- prettier-ignore -->6- Otherwise throw an exception with "Not in whitelist" message. Don't forget to cast the exception.
