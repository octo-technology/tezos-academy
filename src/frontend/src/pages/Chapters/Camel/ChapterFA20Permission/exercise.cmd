ligo compile-storage non_fungible_token.mligo main '' 
ligo dry-run shiptoken.ligo 'Update_operators([{owner=TZ1;operator=TZ1}])' ''
ligo dry-run --sender=A shiptoken.ligo 'Transfer(B,C,token_id)'