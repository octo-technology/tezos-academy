// Fungible Token in ReasonLigo
#include "tzip-12/fa2_interface.religo"
#include "tzip-12/errors.religo"

type tokenOperatorsSet = set(tokenOperator);
type tokenOperators = map(tokenOwner, tokenOperatorsSet);

type tokenLookupId = (tokenOwner, tokenId);
type tokensLedger = big_map(tokenLookupId, tokenBalance);

type storage = {
    tokensLedger: tokensLedger,
    tokenOperators: tokenOperators
};

type custom_entry_points =
| Mint ((tokenAmount, tokenOwner))
| Burn ((tokenAmount, tokenOwner))

type ft_entry_points = 
| Fa2 (parameter)
| Asset (custom_entry_points)

type entrypointParameter = (ft_entry_points, storage);
type entrypointReturn = (list(operation), storage);

//// HELPERS //////
let defaultBalance: tokenBalance = 0n;
let getTokenBalance = ((tokenId, tokenOwner, storage): (tokenId, tokenOwner, storage)): tokenBalance => {
    let tokensLedger: tokensLedger = storage.tokensLedger;
    let tokenLookupId: tokenLookupId = (tokenOwner, tokenId);
    let tokenBalance: option(tokenBalance) = Map.find_opt(tokenLookupId, tokensLedger);
    switch (tokenBalance) {
        | None => defaultBalance
        | Some(tokenBalance) => tokenBalance
    }
}

let updateTokensLedger = ((transferFrom, fromTokenBalance, transferContents, storage): (tokenOwner, tokenBalance, transferContents, storage)): storage => {
    let tokenId: tokenId = transferContents.token_id;
    let transferTo: tokenOwner = transferContents.to_;
    let transferAmount: tokenAmount = transferContents.amount;
    let tokensLedger: tokensLedger = storage.tokensLedger;

    let tokenLookupIdFrom = (transferFrom, tokenId);
    let tokenLookupIdTo = (transferTo, tokenId);
    let balanceTo: tokenBalance = getTokenBalance((tokenId, transferTo, storage));
    // update balance from
    let tokensLedger = Map.update(
        tokenLookupIdFrom,
        Some(abs(fromTokenBalance - transferAmount)),
        tokensLedger
    );
    // update balance to
    let tokensLedger = Map.update(
        tokenLookupIdTo,
        Some(balanceTo + transferAmount),
        tokensLedger
    );
    let storage = {
        ...storage,
        tokensLedger: tokensLedger
    };
    storage
}

let currentPermissionsDescriptor: permissionsDescriptor = {
    operator: Owner_or_operator_transfer,
    receiver: Owner_no_hook,
    sender: Owner_no_hook,
    custom: (None: option(customPermissionPolicy)) 
}

let currentOperatorUpdatePermissionPolicy: operatorUpdatePolicy = Owner_update;

// operatorUpdatePolicy = Owner_update
let canUpdateOperators = ((tokenOwner, storage): (tokenOwner, storage)): unit => {
    if (Tezos.sender != tokenOwner) {
        failwith(errorOperatorUpdateDenied)
    } else { (); }
}

let isOperator = ((tokenOwner, tokenOperator, storage): (tokenOwner, tokenOperator, storage)): bool => {
    let tokenOperatorsSet: option(tokenOperatorsSet) = Map.find_opt(tokenOwner, storage.tokenOperators);
    switch(tokenOperatorsSet) {
        | None => false
        | Some(tokenOperatorsSet) => Set.mem(tokenOperator, tokenOperatorsSet);
    }
}

// operatorTransferPolicy = Owner_or_operator_transfer
let canTransfer = ((from, transferContents, storage): (tokenOwner, transferContents, storage)): unit => {
    if (from != Tezos.sender) {
        if (!isOperator((from, Tezos.sender, storage))) {
            failwith(errorNotOperator)
        } else { (); }
    } else { (); }
}

///////////// BALANCEOF ///////////
type balanceOfRequestsIteratorAccumulator = (list(balanceOfResponseMichelson), storage);
let balanceOfRequestsIterator = 
    ((accumulator, balanceOfRequestMichelson): (balanceOfRequestsIteratorAccumulator, balanceOfRequestMichelson)): balanceOfRequestsIteratorAccumulator => {
        let (balanceOfResponses, storage): balanceOfRequestsIteratorAccumulator = accumulator;
        // Modify the code below

        let balanceOfResponses: list(balanceOfResponseMichelson) = [balanceOfResponseMichelson, ...balanceOfResponses];

        (balanceOfResponses, storage);
    }

let balanceOf = ((balanceOfParameterMichelson, storage): (balanceOfParameterMichelson, storage)): entrypointReturn => {
    let balanceOfParameter: balanceOfParameterAuxiliary = Layout.convert_from_right_comb(balanceOfParameterMichelson);
    let (balanceOfResponses, _): balanceOfRequestsIteratorAccumulator = List.fold(
        balanceOfRequestsIterator,
        balanceOfParameter.requests,
        (([]: list(balanceOfResponseMichelson)), storage)
    );
    let callbackOperation: operation = Tezos.transaction(balanceOfResponses, 0tez, balanceOfParameter.callback);
    ([callbackOperation], storage);
}


//////////////////////// TRANSFER  //////////////////

type transferContentsIteratorAccumulator = (storage, tokenOwner);
let transferContentsIterator = ((accumulator, transferContentsMichelson): (transferContentsIteratorAccumulator, transferContentsMichelson)): transferContentsIteratorAccumulator => {
    let (storage, from_) = accumulator;
    let transferContents: transferContents = Layout.convert_from_right_comb(transferContentsMichelson);
    let tokensLedger: tokensLedger = storage.tokensLedger;
    let fromTokenBalance: tokenBalance = getTokenBalance((transferContents.token_id, from_, storage));

    canTransfer((from_, transferContents, storage));

    if (fromTokenBalance < transferContents.amount) {
        (failwith(errorInsufficientBalance): transferContentsIteratorAccumulator);
    } else { 
        let storage = updateTokensLedger((from_, fromTokenBalance, transferContents, storage));
        (storage, from_);
    }
};

let transferIterator = ((storage, transferMichelson): (storage, transferMichelson)): storage => {
    let transferAuxiliary: transferAuxiliary = Layout.convert_from_right_comb(transferMichelson);
    let from_: tokenOwner = transferAuxiliary.from_;

    let (storage, _) = List.fold(
        transferContentsIterator, 
        transferAuxiliary.txs,
        (storage, from_)
    );
    storage
};

let transfer = ((transferParameter, storage): (transferParameter, storage)): entrypointReturn => {
    let storage = List.fold(transferIterator, transferParameter, storage);
    (([]: list(operation)), storage);
};

///// PERMISSIONS  DESCRIPTOR  /////////////////

let permissionsDescriptor = ((permissionsDescriptorParameter, storage): (permissionsDescriptorParameter, storage)): entrypointReturn => {
    let permissionsDescriptorAuxiliary: permissionsDescriptorAuxiliary = {
        operator: Layout.convert_to_right_comb(currentPermissionsDescriptor.operator),
        receiver: Layout.convert_to_right_comb(currentPermissionsDescriptor.receiver),
        sender: Layout.convert_to_right_comb(currentPermissionsDescriptor.sender),
        custom: (switch (currentPermissionsDescriptor.custom) {
            | Some(custom) => Some(Layout.convert_to_right_comb(custom))
            | None => (None: option(customPermissionPolicyMichelson))
        })
    };
    let currentPermissionsDescriptorMichelson: permissionsDescriptorMichelson = Layout.convert_to_right_comb(permissionsDescriptorAuxiliary);
    let callbackOperation: operation = Tezos.transaction(currentPermissionsDescriptorMichelson, 0tez, permissionsDescriptorParameter); 
    ([callbackOperation], storage)
}

////////////////////////////////// OPERATOR ///////////////////////////
let updateOperators = ((storage, updateOperatorsAddOrRemoveAuxiliary, operatorParameterMichelson): (storage, updateOperatorsAddOrRemoveAuxiliary, operatorParameterMichelson)): storage => {
    let operatorParameter: operatorParameter = Layout.convert_from_right_comb(operatorParameterMichelson);

    canUpdateOperators((operatorParameter.owner, storage));

    let tokenOperatorsSet: option(tokenOperatorsSet) = Map.find_opt(
        operatorParameter.owner,
        storage.tokenOperators
    );
    let tokenOperatorsSet: option(tokenOperatorsSet) = switch (updateOperatorsAddOrRemoveAuxiliary) {
        | Add_operator(n) => {
            switch (tokenOperatorsSet) {
                | Some(tokenOperatorsSet) => Some(Set.add(operatorParameter.operator, tokenOperatorsSet))
                | None => Some(Set.literal([operatorParameter.operator]))
            }
        }
        | Remove_operator(n) => {
            switch (tokenOperatorsSet) {
                | Some(tokenOperatorsSet) => Some(Set.remove(operatorParameter.operator, tokenOperatorsSet))
                | None => (None: option(tokenOperatorsSet))
            }
        }
    };

    let tokenOperators: tokenOperators = Map.update(
        operatorParameter.owner,
        tokenOperatorsSet,
        storage.tokenOperators
    );

    {
        ...storage,
        tokenOperators: tokenOperators
    }
}

let updateOperatorsIterator = ((storage, updateOperatorsAddOrRemoveMichelson): (storage, updateOperatorsAddOrRemoveMichelson)): storage => {
    let updateOperatorsAddOrRemoveAuxiliary: updateOperatorsAddOrRemoveAuxiliary = Layout.convert_from_right_comb(updateOperatorsAddOrRemoveMichelson);
    switch (updateOperatorsAddOrRemoveAuxiliary) {
        | Add_operator(operatorParameterMichelson) => updateOperators((storage, updateOperatorsAddOrRemoveAuxiliary, operatorParameterMichelson));
        | Remove_operator(operatorParameterMichelson) => updateOperators((storage, updateOperatorsAddOrRemoveAuxiliary, operatorParameterMichelson));
    }
}

let updateOperators = ((updateOperatorsParameter, storage): (updateOperatorsParameter, storage)): entrypointReturn => {
    let storage = List.fold(
        updateOperatorsIterator,
        updateOperatorsParameter,
        storage
    );
    (([]: list(operation)), storage)
}

let tokenMetadataRegistry = ((tokenMetadataRegistryParameter, storage): (tokenMetadataRegistryParameter, storage)): entrypointReturn => {
    let callbackTarget = tokenMetadataRegistryParameter;
    let callbackOperation: operation = Tezos.transaction(Tezos.self_address, 0tez, callbackTarget);
    ([callbackOperation], storage);
}

let main = ((parameter, storage): entrypointParameter): entrypointReturn => {
    switch (parameter) {
        | Fa2 fa2 => {
            switch (fa2) {
            | Transfer(transferParameter) => transfer((transferParameter, storage))
            | Balance_of(balanceOfParameterMichelson) => balanceOf((balanceOfParameterMichelson, storage))
            | Permissions_descriptor(permissionsDescriptorParameter) => permissionsDescriptor((permissionsDescriptorParameter, storage))
            | Update_operators(updateOperatorsParameter) => updateOperators((updateOperatorsParameter, storage))
            | Token_metadata_registry(tokenMetadataRegistryParameter) => tokenMetadataRegistry((tokenMetadataRegistryParameter, storage))
            }
        }
        | Asset ast => {
            switch (ast) {
            | Mint(mintParameter) => (([]: list(operation)), storage)
            | Burn(burnParameter) => (([]: list(operation)), storage)
            }
        } 
    }
}