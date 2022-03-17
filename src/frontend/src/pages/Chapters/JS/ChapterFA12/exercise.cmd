// Modify the code below
ligo compile storage fa12.jsligo ''
// Modify the code below
ligo compile parameter fa12.jsligo ''
// Modify the code below
ligo run dry-run --sender tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.jsligo '<parameter_expression_step2>' '<storage_expression_step1>'
// Modify the code below
tezos-client transfer <amount> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
// Modify the code below
ligo compile parameter fa12.jsligo ''
// Modify the code below
ligo compile storage fa12.jsligo ''
// Modify the code below
ligo run dry-run --sender tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ fa12.jsligo '<parameter_expression_step6>' '<storage_expression_step5>'
// Modify the code below
tezos-client transfer <amount> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
