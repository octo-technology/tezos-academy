#include "errors.religo"

type tokenOperator = address;
type tokenOwner = address;
type tokenId = nat;
type tokenAmount = nat;
type tokenBalance = nat;


////////////////////////////  TRANSFER ////////////////////////////////////////
type transferContents = {
    to_: tokenOwner,
    token_id: tokenId,
    amount: tokenAmount
};

type transfer = {
    from_: tokenOwner,
    txs: list(transferContents)
};

/**
 * Concrete parameter type definitions with
 * their Michelson representations.
 */
type transferContentsMichelson = michelson_pair_right_comb(transferContents);

type transferAuxiliary = {
    from_: tokenOwner,
    txs: list(transferContentsMichelson)
};

type transferMichelson = michelson_pair_right_comb(transferAuxiliary);

type transferParameter = list(transferMichelson);


///////////////////////////////////// BALANCEOF ///////////////////////////////////
type balanceOfRequest = {
    owner: tokenOwner,
    token_id: tokenId,
};

type balanceOfResponse = {
    request: balanceOfRequest,
    balance: tokenBalance,
};

type balanceOfCallback = contract(list(balanceOfResponse));

type balanceOfParameter = {
    requests: list(balanceOfRequest),
    callback: balanceOfCallback,
};

type balanceOfRequestMichelson = michelson_pair_right_comb(balanceOfRequest);

type balanceOfResponseAuxiliary = {
    request: balanceOfRequestMichelson,
    balance: tokenBalance
};

type balanceOfResponseMichelson = michelson_pair_right_comb(balanceOfResponseAuxiliary);

type balanceOfCallbackMichelson = contract(list(balanceOfResponseMichelson));

type balanceOfParameterAuxiliary = {
    requests: list(balanceOfRequestMichelson),
    callback: balanceOfCallbackMichelson
};

type balanceOfParameterMichelson = michelson_pair_right_comb(balanceOfParameterAuxiliary);


//////////////  OPERATORS ////////////
type operatorParameter = {
    owner: tokenOwner,
    operator: tokenOperator,
}

type updateOperatorsAddOrRemove =
// There's an extra `_p` in the constructors below to avoid 'redundant constructor' error 
// due to the interop type conversions below
| Add_operator_p(operatorParameter)
| Remove_operator_p(operatorParameter)

type operatorParameterMichelson = michelson_pair_right_comb(operatorParameter);

type updateOperatorsAddOrRemoveAuxiliary =
| Add_operator(operatorParameterMichelson)
| Remove_operator(operatorParameterMichelson)

type updateOperatorsAddOrRemoveMichelson = michelson_or_right_comb(updateOperatorsAddOrRemoveAuxiliary);

type updateOperatorsParameter = list(updateOperatorsAddOrRemoveMichelson);

///////////////////////// PERMISSIONS ////////////////
type operatorTransferPolicy =
| No_transfer
| Owner_transfer
| Owner_or_operator_transfer // default

type ownerHookPolicy =
| Owner_no_hook // default
| Optional_owner_hook
| Required_owner_hook

type customPermissionPolicy = {
    tag: string,
    config_api: option(address)
}

type permissionsDescriptor = {
    operator: operatorTransferPolicy,
    receiver: ownerHookPolicy,
    sender: ownerHookPolicy,
    custom: option(customPermissionPolicy)
}

// non-standard
type operatorUpdatePolicy =
| No_update
| Owner_update // default
| Owner_or_operator_update

type operatorTransferPolicyMichelson = michelson_or_right_comb(operatorTransferPolicy);
type ownerHookPolicyMichelson = michelson_or_right_comb(ownerHookPolicy);
type customPermissionPolicyMichelson = michelson_pair_right_comb(customPermissionPolicy);

type permissionsDescriptorAuxiliary = {
    operator: operatorTransferPolicyMichelson,
    receiver: ownerHookPolicyMichelson,
    sender: ownerHookPolicyMichelson,   
    custom: option(customPermissionPolicyMichelson)
}

type permissionsDescriptorMichelson = michelson_pair_right_comb(permissionsDescriptorAuxiliary);

type permissionsDescriptorParameter = contract(permissionsDescriptorMichelson);

/////////////////////////////// METADATA ///////////////////
type tokenMetadataRegistryTarget = address;
type tokenMetadataRegistryParameter = contract(tokenMetadataRegistryTarget);


/////////////////////////////// ENTRYPOINTS ///////////////////
type parameter = 
| Transfer(transferParameter)
| Balance_of(balanceOfParameterMichelson)
| Permissions_descriptor(permissionsDescriptorParameter)
| Update_operators(updateOperatorsParameter)
| Token_metadata_registry(tokenMetadataRegistryParameter)