// Modify the code below
ligo compile-storage fa12.religo main '{total_amount:1000000n, tokens:Big_map.literal([(("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), 1000000n)]), allowances:(Big_map.empty: big_map((address,address),nat))}'
// Modify the code below
ligo compile-parameter fa12.religo main 'Approve({spender:("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), value:2n})'
// Modify the code below
ligo dry-run --sender=tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.religo main 'Approve({spender:("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), value:2n})' '{total_amount:1000000n, tokens:Big_map.literal([(("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), 1000000n)]), allowances:(Big_map.empty: big_map((address,address),nat))}'
// Modify the code below
tezos-client transfer 0tz from me to TezosAcamedyToken --arg '(Left (Left (Left (Pair "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7" 2))))' --dry-run
// Modify the code below
ligo compile-parameter fa12.religo main 'Transfer({address_from:("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), address_to:("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), value:2n})'
// Modify the code below
ligo compile-storage fa12.religo main '{total_amount:1000000n, tokens:Big_map.literal([(("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), 1000000n)]), allowances:Big_map.literal([((("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), ("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address)) ,2n)])}'
// Modify the code below
ligo dry-run --sender=tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.religo main 'Transfer({address_from:("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), address_to:("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address), value:2n})' '{total_amount:1000000n, tokens:Big_map.literal([(("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), 1000000n)]), allowances:Big_map.literal([((("tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ":address), ("tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7":address)) ,2n)])}'
// Modify the code below
tezos-client transfer 0tz from me to TezosAcamedyToken --arg '(Right (Pair (Pair "tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ" "tz1NiAGZgRV8F1E3qYFEPgajntzTRDYkU9h7") 2))' --dry-run