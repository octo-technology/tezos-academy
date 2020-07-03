(**
 Helper types and functions to implement transfer hook contract.
 Each transfer hook contract maintains a registry of known FA2 contracts and
 validates that it is invoked from registered FA2 contracts.
 
 The implementation assumes that the transfer hook entry point is labeled as
 `%tokens_transferred_hook`.
 *)
 
#if !FA2_HOOK_LIB
#define FA2_HOOK_LIB

#include "../fa2_hook.ligo"

function get_hook_entrypoint (const hook_contract : address) : (unit) -> contract(transfer_descriptor_param) is
block {
  const hook_entry_opt : option(contract(transfer_descriptor_param)) = (None : option(contract(transfer_descriptor_param)) ); //Tezos.get_entrypoint_opt("%tokens_transferred_hook", hook_contract);
  const hook_entry : contract(transfer_descriptor_param) = case (hook_entry_opt) of
  | Some (hook_entry) -> hook_entry
  | None -> (failwith("Undefined hook"): contract(transfer_descriptor_param))
  end
} with (function (const u : unit) : contract(transfer_descriptor_param) is hook_entry)

function create_register_hook_op(const fa2 : contract(fa2_with_hook_entry_points); const descriptor : permissions_descriptor_) : operation is
block {
  const hook_fn : (unit) -> contract(transfer_descriptor_param) = get_hook_entrypoint(Tezos.self_address);
  const p : set_hook_param_aux = record [
      hook = hook_fn;
      permissions_descriptor = Layout.convert_to_right_comb(descriptor);
   ];
  const pm : set_hook_param_michelson = Layout.convert_to_right_comb((p:set_hook_param_aux));
  const op : operation = Tezos.transaction (Set_transfer_hook (pm), 0mutez, fa2)
} with op

type fa2_registry is set(address)

function register_with_fa2 (const fa2 : contract(fa2_with_hook_entry_points); const descriptor : permissions_descriptor_; const registry : fa2_registry) : operation * fa2_registry is
block {  
  const op : operation = create_register_hook_op (fa2, descriptor);
  const fa2_address : address = Tezos.address (fa2);
  const new_registry : fa2_registry = Set.add (fa2_address, registry);
} with (op, new_registry)

function validate_hook_call (const fa2 : address; const registry : fa2_registry) : unit is
  if Set.mem (fa2, registry)
  then unit
  else failwith ("UNKNOWN_FA2_CALL")

#endif
