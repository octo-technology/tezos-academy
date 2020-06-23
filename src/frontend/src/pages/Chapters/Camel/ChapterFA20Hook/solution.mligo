#include "tzip-12/lib/fa2_transfer_hook_lib.mligo"
#include "tzip-12/lib/fa2_owner_hooks_lib.mligo"


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
      // Type your solution below
      match to_receiver_hook r with
      | Hook_contract h ->
        let pm = transfer_descriptor_param_to_michelson p in
        let op = Operation.transaction pm 0mutez h in
        op :: ops
      | Hook_undefined err ->
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
    let u = validate_hook_call (Tezos.sender, s.fa2_registry) in
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
