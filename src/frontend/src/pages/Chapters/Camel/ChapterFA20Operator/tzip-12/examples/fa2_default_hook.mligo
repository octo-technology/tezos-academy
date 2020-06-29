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
    let hook_calls = owners_transfer_hook (p, s.descriptor) in
    let ops = List.map (fun (call : hook_entry_point) ->
        Operation.transaction pm 0mutez call
      ) hook_calls
    in
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

(* non-transferable token (neither token owner, nor operators can transfer tokens. *)
  let own_policy : permissions_descriptor = {
  operator = No_transfer;
  sender = Owner_no_hook;
  receiver = Owner_no_hook;
  custom = (None : custom_permission_policy option);
}
