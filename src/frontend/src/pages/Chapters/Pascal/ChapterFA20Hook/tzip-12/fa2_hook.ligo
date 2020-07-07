
#if !FA2_HOOK
#define FA2_HOOK

#include "fa2_interface.ligo"

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
    Set_transfer_hook of set_hook_param_michelson

#endif
