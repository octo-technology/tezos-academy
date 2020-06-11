//let new_perm : permissions_descriptor = {operator=Owner_or_operator_transfer; receiver=Owner_no_hook; sender=Owner_no_hook; custom=(None : custom_permission_policy option) }

ligo compile-storage shiptoken.mligo main '' 
ligo dry-run shiptoken.ligo 'Update_operators([{owner=TZ1;operator=TZ1}])' ''
ligo dry-run --sender=A shiptoken.ligo 'Transfer(B,C,token_id)'