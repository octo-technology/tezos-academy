ligo compile-storage tqtz_nft.mligo nft_token_main 
'{ 
    ledger = Big_map.literal([(1n,("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address))]); 
    operators = (Big_map.empty : ((address * address), unit) big_map); 
    metadata = { 
        token_defs = Set.add {from_=1n; to_=1000n} (Set.empty : token_def set); 
        last_used_id = 1n; 
        metadata = Big_map.literal([ ({from_=1n;to_=1000n},{token_id=0n; symbol="<3"; name="TzAcademyShip"; decimals=0n; extras=(Map.empty :(string, string) map)}) ])
    }
}'

ligo dry-run --sender=tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv tqtz_nft.mligo nft_token_main 
'Fa2 (Update_operators([ 
    operator_update_to_michelson (Add_operator_p({
        owner=("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address);
        operator=("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address)
    }))
]))' 
'{ 
    ledger = Big_map.literal([(1n,("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address))]); 
    operators = (Big_map.empty : ((address * address), unit) big_map); 
    metadata = { 
        token_defs = Set.add {from_=1n; to_=1000n} (Set.empty : token_def set); 
        last_used_id = 1n; 
        metadata = Big_map.literal([ ({from_=1n;to_=1000n},{token_id=0n; symbol="<3"; name="TzAcademyShip"; decimals=0n; extras=(Map.empty :(string, string) map)}) ])
    }
}'

ligo dry-run --sender=tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU tqtz_nft.mligo nft_token_main 
'Fa2 (Transfer( [ 
    transfer_to_michelson ({
        from_=("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address); 
        txs=[{
            to_=("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN": address); 
            token_id=1n; 
            amount=1n}]
    }) 
]))' 
'{ 
    ledger = Big_map.literal([(1n,("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address))]); 
    operators = Big_map.literal([ ((("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv": address), ("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address)), unit) ]); 
    metadata = { 
        token_defs = Set.add {from_=1n; to_=1000n} (Set.empty : token_def set); 
        last_used_id = 1n; 
        metadata = Big_map.literal([ ({from_=1n;to_=1000n},{token_id=0n; symbol="<3"; name="TzAcademyShip"; decimals=0n; extras=(Map.empty :(string, string) map)}) ])
    }
}'
