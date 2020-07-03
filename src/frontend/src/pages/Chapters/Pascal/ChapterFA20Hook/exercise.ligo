#include "tzip-12/lib/fa2_transfer_hook_lib.ligo"
#include "tzip-12/lib/fa2_hooks_lib.ligo"

type storage is record [
  fa2_registry : fa2_registry;
  receiver_whitelist : set(address);
]

function custom_validate_receivers (const p : transfer_descriptor_param_; const wl : set(address)) : list(operation) is
block {
  function convert_get(const tm : transfer_destination_descriptor) : option(address) is block { 
    const t : transfer_destination_descriptor_ = Layout.convert_from_right_comb((tm:transfer_destination_descriptor)) 
  } with t.to_;

  function get_receiver(const txm : transfer_descriptor) : list(option(address)) is block {
    const tx : transfer_descriptor_ = Layout.convert_from_right_comb(txm);
  } with List.map( convert_get, tx.txs);

  const receivers : set(address) = get_owners_from_batch (p.batch, get_receiver);

  function create_hook_receiver_operation(const ops : list(operation); const h : contract(transfer_descriptor_param); const p : transfer_descriptor_param_) : list(operation) is
  // Type your solution below
    block {

    } with ;
  
  function verify_receiver_in_whitelist(const ops : list(operation); const r : address; const wl : set(address)) : list(operation) is
    // Type your solution below


  (* receiver contract implements fa2_token_receiver interface: invoke it otherwise check whitelist*)
  function check_receiver (const ops : list(operation); const r : address) : list(operation) is
    case to_receiver_hook(r) of
      | Some (h) -> create_hook_receiver_operation(ops, h, p)
      | None -> verify_receiver_in_whitelist(ops, r, wl)
    end
    
} with Set.fold(check_receiver, receivers, (nil : list(operation)))

function custom_transfer_hook (const p : transfer_descriptor_param_; const s : storage) : list(operation) is
  custom_validate_receivers (p, s.receiver_whitelist)


function get_policy_descriptor (const u : unit) : permissions_descriptor_ is 
block { skip } with record [
    operator = Layout.convert_to_right_comb(Owner_or_operator_transfer);
    sender = Layout.convert_to_right_comb(Owner_no_hook);
    receiver = Layout.convert_to_right_comb(Owner_no_hook) ; (* overridden by the custom policy *)
    custom = Some (Layout.convert_to_right_comb((record [ 
      tag = "receiver_hook_and_whitelist"; 
      config_api = Some (Tezos.self_address); //(None: option(address));
    ]: custom_permission_policy_)));
]

type config_whitelist is 
  | Add_receiver_to_whitelist of set(address)
  | Remove_receiver_from_whitelist of set(address)

function configure_receiver_whitelist (const cfg : config_whitelist; const wl : set(address)) : set(address) is
block { skip } with case cfg of
  | Add_receiver_to_whitelist (rs) ->
    Set.fold (
      (function (const l : set(address); const a : address) : set(address) is Set.add (a, l) ),
      rs, wl)
  | Remove_receiver_from_whitelist (rs) ->
     Set.fold (
      (function (const l : set(address); const a : address) : set(address) is Set.remove (a, l) ),
      rs, 
      wl)
  end


type entry_points is
  | Tokens_transferred_hook of transfer_descriptor_param_
  | Register_with_fa2 of contract(fa2_with_hook_entry_points)
  | Config_receiver_whitelist of config_whitelist

function tokens_transferred_hook(const p : transfer_descriptor_param_; const s : storage) : list(operation) * storage is 
block {
    const u : unit = validate_hook_call (Tezos.sender, s.fa2_registry);
    const ops : list(operation) = custom_transfer_hook (p, s);
} with (ops, s)

function register_with_fa2(const fa2 : contract(fa2_with_hook_entry_points); const s : storage) : list(operation) * storage is 
block {
    const descriptor : permissions_descriptor_ = get_policy_descriptor (unit);
    const ret : operation * fa2_registry = register_with_fa2 (fa2, descriptor, s.fa2_registry);
    s.fa2_registry := ret.1;
} with (list [ret.0], s)

function config_receiver_whitelist(const cfg : config_whitelist; const s : storage) : list(operation) * storage is 
block {
    const new_wl : set(address) = configure_receiver_whitelist (cfg, s.receiver_whitelist);
    s.receiver_whitelist := new_wl;
} with ((nil : list(operation)), s)

function main (const param : entry_points; const s : storage) : list(operation) * storage is
block { skip } with
  case param of
  | Tokens_transferred_hook (p) -> tokens_transferred_hook(p,s)
  | Register_with_fa2 (fa2) -> register_with_fa2(fa2, s)
  | Config_receiver_whitelist (cfg) -> config_receiver_whitelist(cfg, s)
  end