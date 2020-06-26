ligo compile-storage non_fungible_token.religo main 
'{
    tokensLedger:(Big_map.empty: big_map(tokenId, tokenOwner)), 
    tokenOperators:(Map.empty : map(tokenOwner, tokenOperatorsSet))
}'


ligo dry-run --sender=tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv non_fungible_token.religo main 
'Fa2 (Update_operators([ 
    <replace this by the right parameter>
]))' 
'<replace by storage step1>'


ligo dry-run --sender=tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU non_fungible_token.religo main 
'Fa2 (Transfer( [ 
    <replace this by the right parameter>
]))' 
'{
    tokensLedger:(Big_map.empty: big_map(tokenId, tokenOwner)), 
    tokenOperators:(Map.empty : map(tokenOwner, tokenOperatorsSet))
}'
