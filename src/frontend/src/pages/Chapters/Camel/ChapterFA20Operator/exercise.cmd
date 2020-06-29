ligo compile-storage tqtz_nft.mligo nft_token_main 
'{ 
    ledger = (Big_map.empty : (token_id, address) big_map);
    operators = (Big_map.empty : ((address * address), unit) big_map); 
    metadata = { 
        token_defs = Set.add {from_=1n; to_=1000n} (Set.empty : token_def set); 
        last_used_id = 1n; 
        metadata = Big_map.literal([ ({from_=1n;to_=1000n},{token_id=0n; symbol="<3"; name="TzAcademyShip"; decimals=0n; extras=(Map.empty :(string, string) map)}) ])
    }
}'

ligo dry-run --sender=tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv tqtz_nft.mligo nft_token_main 
'Fa2 (Update_operators([ 
    <replace this by the right parameter>
]))' 
'<replace by storage step1>'

ligo dry-run --sender=tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU tqtz_nft.mligo nft_token_main 
'Fa2 (Transfer( [ 
    <replace this by the right parameter>
]))' 
'{ 
    ledger = (Big_map.empty : (token_id, address) big_map);
    operators = (Big_map.empty : ((address * address), unit) big_map); 
    metadata = { 
        token_defs = Set.add {from_=1n; to_=1000n} (Set.empty : token_def set); 
        last_used_id = 1n; 
        metadata = Big_map.literal([ ({from_=1n;to_=1000n},{token_id=0n; symbol="<3"; name="TzAcademyShip"; decimals=0n; extras=(Map.empty :(string, string) map)}) ])
    }
}'
