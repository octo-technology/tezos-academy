// Modify the code below
ligo compile-storage fa12.mligo main '<parameter>'
// Modify the code below
ligo compile-parameter fa12.mligo main '<parameter>'
// Modify the code below
ligo dry-run --sender=tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.mligo main '<parameter_expression>' '<storage_expression>'
// Modify the code below
tezos-client transfer <amount> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
// Modify the code below
ligo compile-parameter refa12.mligo main ''
// Modify the code below
ligo compile-storage fa12.mligo main ''
// Modify the code below
ligo dry-run --sender=tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.mligo main '<parameter_expression>' '<storage_expression>'
// Modify the code below
tezos-client transfer <amount> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run