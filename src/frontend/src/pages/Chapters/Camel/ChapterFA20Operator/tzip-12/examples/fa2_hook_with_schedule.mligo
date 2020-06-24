(**
Implementation of a generic permission transfer hook that supports sender/receiver
hooks. Contract behavior is driven by the permissions descriptor value in the
contract storage and its particular settings for `sender` and `receiver` policies.

It is possible to use additional custom policy "schedule" which let pause/unpause
transfers based on used schedule
*)

#include "../lib/fa2_transfer_hook_lib.mligo"
#include "../lib/fa2_owner_hooks_lib.mligo"

type schedule_interval = {
  interval : int;
  locked : bool;
}

type schedule = {
  start : timestamp;
  schedule : schedule_interval list;
  cyclic : bool;
}

type schedule_policy = {
  schedule : schedule;
  schedule_interval : int;
}

type permission_policy = {
  descriptor : permissions_descriptor;
  schedule_policy : schedule_policy option;
}

type storage = {
  fa2_registry : fa2_registry;
  policy : permission_policy;
}

type schedule_config =
  | Set_schedule of schedule
  | View_schedule of (schedule option) contract

let configure_schedule (cfg, policy : schedule_config * schedule_policy option)
    : (operation list) * (schedule_policy option) =
  match cfg with
  | Set_schedule s -> 
    let total_interval = List.fold 
      (fun (t, i : int * schedule_interval) -> t + i.interval)
      s.schedule 0 in
    let new_policy : schedule_policy = { schedule = s; schedule_interval = total_interval; } in
    ([] : operation list), (Some new_policy)
  | View_schedule v ->
    let s = match policy with
    | Some p -> Some p.schedule
    | None -> (None : schedule option)
    in
    let op = Operation.transaction s 0mutez v in
    [op], policy

let custom_policy_to_descriptor (p : permission_policy) : permissions_descriptor =
  match p.schedule_policy with
  | None -> p.descriptor
  | Some s ->
    let custom_p : custom_permission_policy = {
      tag = "schedule";
      config_api = Some Current.self_address;
    }
    in
    {p.descriptor with custom = Some custom_p; }

type interval_result =
  | Reminder of int
  | Found of schedule_interval

let is_schedule_locked (policy : schedule_policy) : bool =
  let elapsed : int = Current.time - policy.schedule.start in
  if elapsed > policy.schedule_interval && not policy.schedule.cyclic
  then true
  else (* find schedule interval *)
    let  e = (elapsed mod policy.schedule_interval) + 0 in
    let interval = List.fold 
      (fun (acc, i : interval_result * schedule_interval) ->
        match acc with
        | Found si -> acc
        | Reminder r ->
          if r < i.interval then Found i
          else Reminder (r - i.interval)
      ) policy.schedule.schedule (Reminder e) in
    match interval with
    | Reminder r -> (failwith "SCHEDULE_ERROR" : bool)
    | Found i -> i.locked

let validate_schedule (policy : schedule_policy option) : unit =
  match policy with
  | None -> unit
  | Some p ->
    let locked = is_schedule_locked p in
    if locked
    then failwith "SCHEDULE_LOCKED"
    else unit

type  entry_points =
  | Tokens_transferred_hook of transfer_descriptor_param_michelson
  | Register_with_fa2 of fa2_with_hook_entry_points contract
  | Config_schedule of schedule_config

 let main (param, s : entry_points * storage) 
    : (operation list) * storage =
  match param with
  | Tokens_transferred_hook pm ->
    let p = transfer_descriptor_param_from_michelson pm in
    let u1 = validate_hook_call (Tezos.sender, s.fa2_registry) in
    let u2 = validate_schedule(s.policy.schedule_policy) in
    let hook_calls = owners_transfer_hook(p, s.policy.descriptor) in
    let ops = List.map (fun (call : hook_entry_point) ->
        Operation.transaction pm 0mutez call
      ) hook_calls
    in
    ops, s

  | Register_with_fa2 fa2 ->
    let descriptor = custom_policy_to_descriptor s.policy in
    let op , new_registry = register_with_fa2 (fa2, descriptor, s.fa2_registry) in
    let new_s = { s with fa2_registry = new_registry; } in
    [op], new_s

  | Config_schedule cfg ->
    let ops, new_schedule = configure_schedule (cfg, s.policy.schedule_policy) in
    let new_s = { s with policy.schedule_policy = new_schedule; } in
    ops, new_s

