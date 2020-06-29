ligo compile-storage non_fungible_token.religo main 
'{
    tokensLedger:Big_map.literal([ (1n,("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address)) ]), 
    tokenOperators:(Map.empty : map(tokenOwner, tokenOperatorsSet))
}'


ligo dry-run --sender=tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv non_fungible_token.religo main 
'Fa2 (Update_operators([ 
    Layout.convert_to_right_comb (
        Add_operator (
            Layout.convert_to_right_comb(({
                owner:("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address), 
                operator:("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address)
            }: operatorParameter))
        )
    )
]))' 
'{
    tokensLedger:Big_map.literal([ (1n,("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address)) ]), 
    tokenOperators:(Map.empty : map(tokenOwner, tokenOperatorsSet))
}'


ligo dry-run --sender=tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU non_fungible_token.religo main 
'Fa2 (Transfer( [ 
    Layout.convert_to_right_comb(({
        from_:("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address),
        txs:[
            Layout.convert_to_right_comb(({
                to_:("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN": address),
                token_id:1n,
                amount:1n
            }: transferContents))
        ]
    }: transferAuxiliary))
]))' 
'{
    tokensLedger:Big_map.literal([ (1n,("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address)) ]), 
    tokenOperators:Map.literal([ (("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv": address), Set.add (("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address),(Set.empty: set(address))) ) ])
}'
