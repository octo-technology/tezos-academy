ligo compile-storage shiptoken.mligo main  
'{
    paused=false; 
    entities=Map.literal [((1n,0n),{name="first";code="040233"})]; 
    entity_owner=Map.literal [((1n,0n),("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address))]; 
    owner_entities=Map.literal [
        (("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address), (Set.add (1n,0n) (Set.empty:entity_key set)));
        (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN":address),(Set.empty:entity_key set));
        (("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address),(Set.empty:entity_key set))
        ]; 
    tokens=Map.literal [
        (0n,{
            total_supply=1n; 
            metadata={
                token_id=0n; 
                symbol="<3"; 
                name="TzAcademyShip"; 
                decimals=0n; 
                extras=(Map.empty :(string, string) map)
                }
            })
        ]; 
    operators=(Set.empty : operator_param set); 
    administrator=("tz1UK81V9ccgpDjq8MVUE9uP4mnmNiSZQm9J" : address); 
    permissions_descriptor={
        operator=Layout.convert_to_right_comb(Owner_or_operator_transfer); 
        receiver=Layout.convert_to_right_comb(Owner_no_hook); 
        sender=Layout.convert_to_right_comb(Owner_no_hook); 
        custom=(None : custom_permission_policy_michelson option) 
        } 
}'


ligo dry-run --sender=tz1UK81V9ccgpDjq8MVUE9uP4mnmNiSZQm9J shiptoken.mligo main 
'Fa2 (
    Update_operators([
        (
            Layout.convert_to_right_comb( 
            Add_operator(
                ( 
                    Layout.convert_to_right_comb(
                        ({
                            owner=("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address);
                            operator=("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address)
                        }: operator_param)
                    ) : operator_param_michelson
                )
            )
        ) : update_operator_michelson) 
    ])
)'
'{
    paused=false; 
    entities=Map.literal [((1n,0n),{name="first";code="040233"})]; 
    entity_owner=Map.literal [((1n,0n),("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address))]; 
    owner_entities=Map.literal [
        (("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address), (Set.add (1n,0n) (Set.empty:entity_key set)));
        (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN":address),(Set.empty:entity_key set));
        (("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address),(Set.empty:entity_key set))
        ]; 
    tokens=Map.literal [
        (0n,{
            total_supply=1n; 
            metadata={
                token_id=0n; 
                symbol="<3"; 
                name="TzAcademyShip"; 
                decimals=0n; 
                extras=(Map.empty :(string, string) map)
                }
            })
        ]; 
    operators=(Set.empty : operator_param set); 
    administrator=("tz1UK81V9ccgpDjq8MVUE9uP4mnmNiSZQm9J" : address); 
    permissions_descriptor={
        operator=Layout.convert_to_right_comb(Owner_or_operator_transfer); 
        receiver=Layout.convert_to_right_comb(Owner_no_hook); 
        sender=Layout.convert_to_right_comb(Owner_no_hook); 
        custom=(None : custom_permission_policy_michelson option) 
        } 
}'


ligo dry-run --sender=tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU shiptoken.mligo main 
'Fa2 (
    Transfer( [ 
        (Layout.convert_to_right_comb( 
            ({
                from_=("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address);
                txs=[   
                    (Layout.convert_to_right_comb(
                        ({
                            to_=("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN": address);
                            token_id=0n;
                            amount=1n
                        }: transfer_destination)
                    ) : transfer_destination_michelson) 
                    ]
            } : transfer_aux)
        ): transfer_michelson) 
    ])
)' 
'{
    paused=false; 
    entities=Map.literal [((1n,0n),{name="first";code="040233"})]; 
    entity_owner=Map.literal [((1n,0n),("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address))]; 
    owner_entities=Map.literal [
        (("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address), (Set.add (1n,0n) (Set.empty:entity_key set)));
        (("tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN":address),(Set.empty:entity_key set));
        (("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address),(Set.empty:entity_key set))
        ]; 
    tokens=Map.literal [
        (0n,{
            total_supply=1n; 
            metadata={
                token_id=0n; 
                symbol="<3"; 
                name="TzAcademyShip"; 
                decimals=0n; 
                extras=(Map.empty :(string, string) map)
                }
            })
        ]; 
    operators=Set.add 
        ({
            owner=("tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv":address);
            operator=("tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU":address)
        }: operator_param)
        (Set.empty : operator_param set); 
    administrator=("tz1UK81V9ccgpDjq8MVUE9uP4mnmNiSZQm9J" : address); 
    permissions_descriptor={
        operator=Layout.convert_to_right_comb(Owner_or_operator_transfer); 
        receiver=Layout.convert_to_right_comb(Owner_no_hook); 
        sender=Layout.convert_to_right_comb(Owner_no_hook); 
        custom=(None : custom_permission_policy_michelson option) 
        } 
}'
