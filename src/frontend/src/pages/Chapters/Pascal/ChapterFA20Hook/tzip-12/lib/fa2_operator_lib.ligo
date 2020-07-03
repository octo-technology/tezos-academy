// SPDX-FileCopyrightText: 2020 tqtezos
// SPDX-License-Identifier: MIT

(*
 * Operator library for stablecoin smart-contract
 *)

#if !FA2_OPERATOR_LIB
#define FA2_OPERATOR_LIB

#include "../fa2_interface.ligo"
#include "fa2_hooks_lib.ligo"

(*
 * Validates whether the given operator parameter is equal to `SENDER`
 *)
function validate_operator_owner_is_sender
  ( const param : operator_param
  ) : unit is if param.0 = Tezos.sender
  then unit else failwith ("NOT_TOKEN_OWNER")



(*
 * Validates operators for the given tranfser batch
 * and operator storage
 *)
function validate_operators
  ( const transfer_param         : transfer_param
  ; const operators              : operators
  ) : unit is block
{ const operator : address = Tezos.sender
; const owner : address = transfer_param.0
} with if owner = operator or Big_map.mem ((owner, operator), operators)
  then unit else failwith ("FA2_NOT_OPERATOR")

(*
 * Add operator from the given parameter and operator storage
 *)
function add_operator
  ( const param     : operator_param
  ; const operators : operators
  ) : operators is block
{ validate_operator_owner_is_sender (param)
; const operator_key : (owner * operator) = (param.0, param.1)
} with Big_map.update (operator_key, Some (unit), operators)

(*
 * Remove operator from the given storage
 *)
function remove_operator
  ( const param     : operator_param
  ; const operators : operators
  ) : operators is block
{ validate_operator_owner_is_sender (param)
; const operator_key : (owner * operator) = (param.0, param.1)
} with Big_map.remove (operator_key, operators)

(*
 * Adds or removes operators from a provided list of instructions
 * accordingly for the given storage
 *)
function update_operators
  ( const params    : update_operator_params
  ; const operators : operators
  ) : operators is List.fold
    ( function
        ( const operators             : operators
        ; const update_operator_param : update_operator_param
        ) : operators is case update_operator_param of
          Add_operator    (param) -> add_operator    (param, operators)
        | Remove_operator (param) -> remove_operator (param, operators)
        end
    , params
    , operators
    )

#endif