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

Some helpers functions has been gatthered in a hook library which help defining hooks when implementing a FA2 contract. This library contains following functions and type alias :

The type _fa2_registry_ is a set of address

the function *get_hook_entrypoint* retrieves the contract interface of entrypoint "%tokens_transferred_hook" for a given contract address

the function *register_with_fa2* 
* takes the address of a FA2 contract (having hooks) and register it in the registry (set of address).
* calls the *Set_transfer_hook* entrypoint of a FA2 contract

the function *create_register_hook_op* sends a transaction to a FA2 contract (having hook entrypoints). The transaction intends to invoke the entrypoint *Set_transfer_hook*.  This entrypoint *Set_transfer_hook* requires as parameters : 
* the contract interface of entrypoint "%tokens_transferred_hook" 
* a _permission descriptor_

the function *validate_hook_call* ensures an address in registered in the registry (set of address).

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

#### Implementation of a custom hook

Let's see an example of FA2 implementation. The following smart contract implements a token where transfer receiver must be in a whitelist. This whitelisting is done via a tranfer hook.
It uses a combination of a receiver white list and *fa2_token_receiver* interface.
Transfer is permitted if a receiver address is in the receiver white list OR implements *fa2_token_receiver* interface. 
If a receiver address implements *fa2_token_receiver* interface, its *tokens_received* entry point must be called.

```
#include "../lib/fa2_hook_lib.mligo"
#include "../lib/fa2_behaviors.mligo"


type storage = {
  fa2_registry : fa2_registry;
  receiver_whitelist : address set;
} 

let custom_validate_receivers (p, wl : transfer_descriptor_param * (address set))
    : operation list =
  let get_receiver : get_owners = fun (tx : transfer_descriptor) -> 
    List.map (fun (t : transfer_destination_descriptor) -> t.to_) tx.txs in
  let receivers = get_owners_from_batch (p.batch, get_receiver) in

  Set.fold 
    (fun (ops, r : (operation list) * address) ->
      let hook, err = to_sender_hook r in
      match hook with
      | Some h ->
        let pm = transfer_descriptor_param_to_michelson p in
        let op = Operation.transaction pm 0mutez h in
        op :: ops
      | None -> 
        if Set.mem r wl
        then ops
        else (failwith err : operation list)
    )
    receivers ([] : operation list)

let custom_transfer_hook (p, s : transfer_descriptor_param * storage) : operation list =
  custom_validate_receivers (p, s.receiver_whitelist)


let get_policy_descriptor (u : unit) : permissions_descriptor =
  {
    operator = Owner_or_operator_transfer;
    sender = Owner_no_hook;
    receiver = Owner_no_hook ; (* overridden by the custom policy *)
    custom = Some { 
      tag = "receiver_hook_and_whitelist"; 
      config_api = (Some Current.self_address);
    };
  }

type config_whitelist = 
  | Add_receiver_to_whitelist of address set
  | Remove_receiver_from_whitelist of address set

let configure_receiver_whitelist (cfg, wl : config_whitelist * (address set))
    : address set =
  match cfg with
  | Add_receiver_to_whitelist rs ->
    Set.fold 
      (fun (l, a : (address set) * address) -> Set.add a l)
      rs wl
  | Remove_receiver_from_whitelist rs ->
     Set.fold 
      (fun (l, a : (address set) * address) -> Set.remove a l)
      rs wl

type  entry_points =
  | Tokens_transferred_hook of transfer_descriptor_param
  | Register_with_fa2 of fa2_with_hook_entry_points contract
  | Config_receiver_whitelist of config_whitelist

 let main (param, s : entry_points * storage) 
    : (operation list) * storage =
  match param with
  | Tokens_transferred_hook p ->
    // verify s.fa2_registry contains p.fa2 address otherwise throw exception 
    let u = validate_hook_call (p.fa2, s.fa2_registry) in
    let ops = custom_transfer_hook (p, s) in
    ops, s

  | Register_with_fa2 fa2 ->
    let descriptor = get_policy_descriptor unit in
    let op , new_registry = register_with_fa2 (fa2, descriptor, s.fa2_registry) in
    let new_s = { s with fa2_registry = new_registry; } in
    [op], new_s

  | Config_receiver_whitelist cfg ->
    let new_wl = configure_receiver_whitelist (cfg, s.receiver_whitelist) in
    let new_s = { s with receiver_whitelist = new_wl; } in
    ([] : operation list), new_s

```



## Your mission



<!-- prettier-ignore -->1- We want you to simulate the transfer of 2 TAT (Tezos Academy Token) to *alice*. Write a ligo command line for preparing a simulated storage where you (tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ) possess 1000000 of token and no allowances.



