// Modify the code below
ligo compile-storage non_fungible_token.ligo main 
'record[  
    ledger=(big_map end: big_map(token_id, address));
    operators=(big_map end: big_map ((owner * operator), unit))  
]'

// Modify the code below
ligo dry-run --sender=tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv non_fungible_token.ligo main 
'Fa2 (Update_operators(
    <replace this by the right parameter>
))'
'<replace by storage of step 1>'

// Modify the code below
ligo dry-run --sender=tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU non_fungible_token.ligo main 
'Fa2 (Transfer(list [ 
    <replace this by the right parameter>
]))' 
'record[  
    ledger=(big_map end: big_map(token_id, address));
    operators=(big_map end: big_map ((owner * operator), unit))  
]'

