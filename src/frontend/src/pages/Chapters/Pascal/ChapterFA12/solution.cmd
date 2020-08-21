ligo compile-storage fa12.ligo main 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address)->record [ balance=1000000n; allowances=(map [] : map(address, amt)) ] ] ]'
// Modify the code below
ligo compile-parameter fa12.ligo main 'Approve(("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), 2n)'
// Modify the code below
ligo dry-run --sender=tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.ligo main 'Approve(("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), 2n)' 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address)->record [ balance=1000000n; allowances=(map [] : map(address, amt)) ] ] ]'
// Modify the code below
tezos-client transfer 0tz from me to TezosAcamedyToken --arg '(Left (Left (Left (Pair "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" 2))))' --dry-run
// Modify the code below
ligo compile-parameter fa12.ligo main 'Transfer(("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), ("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), 2n)'
// Modify the code below
ligo compile-storage fa12.ligo main 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address)->record [balance=1000000n; allowances=map [("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address)->2n] ] ] ]'
// Modify the code below
ligo dry-run --sender=tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.ligo main 'Transfer(("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), ("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), 2n)' 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address)->record [balance=1000000n; allowances=map [("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address)->2n] ] ] ]'
// Modify the code below
tezos-client transfer 0tz from me to TezosAcamedyToken --arg '(Right (Pair (Pair "tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7") 2))' --dry-run

