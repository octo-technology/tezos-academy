// Modify the code below
ligo compile storage fa12.jsligo '{total_amount:1000000 as nat, tokens:Big_map.literal(list([["tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address,1000000 as nat]])),allowances:Big_map.empty as big_map<[address,address],nat>}'
// Modify the code below
ligo compile parameter fa12.jsligo 'Approve({spender:"tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" as address,value:2 as nat})'
// Modify the code below
ligo run dry-run --sender tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.jsligo 'Approve({spender:("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" as address), value:2 as nat})' '{total_amount:1000000 as nat, tokens:Big_map.literal(list([["tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address,1000000 as nat]])),allowances:Big_map.empty as big_map<[address,address],nat>}'
// Modify the code below
tezos-client transfer 0tz from me to TezosAcamedyToken --arg '(Left (Left (Left (Pair "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" 2))))' --dry-run
// Modify the code below
ligo compile parameter fa12.jsligo 'Transfer({address_from:("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address), address_to:("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" as address), value:2 as nat})'
// Modify the code below
ligo compile storage fa12.jsligo '{total_amount:1000000 as nat,tokens:Big_map.literal(list([["tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address, 1000000 as nat]])),allowances:Big_map.literal(list([[["tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address,"tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" as address],2 as nat]]))}'
// Modify the code below
ligo run dry-run --sender tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.jsligo 'Transfer({address_from:("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address), address_to:("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" as address), value:2 as nat})' '{total_amount:1000000 as nat,tokens:Big_map.literal(list([["tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address, 1000000 as nat]])),allowances:Big_map.literal(list([[["tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" as address,"tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" as address],2 as nat]]))}'
// Modify the code below
tezos-client transfer 0tz from me to TezosAcamedyToken --arg '(Right (Pair (Pair "tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7") 2))' --dry-run
