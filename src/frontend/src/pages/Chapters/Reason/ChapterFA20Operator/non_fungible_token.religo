(**
Implementation of the FA2 interface for the NFT contract - Provided by Stove Labs .
 *)
 
#include "tzip-12/fa2_interface.religo"
#include "tzip-12/errors.religo"

type tokenOperatorsSet = set(tokenOperator);
type tokenOperators = map(tokenOwner, tokenOperatorsSet);

type tokensLedger = big_map(tokenId, tokenOwner);

type storage = {
    tokensLedger: tokensLedger,
    tokenOperators: tokenOperators
};

type custom_entry_points =
| Mint ((tokenId, address))
| Burn (tokenId)

type nft_entry_points = 
| Fa2 (parameter)
| Asset (custom_entry_points)

type entrypointParameter = (nft_entry_points, storage);
type entrypointReturn = (list(operation), storage);

///////////////////////// HELPERS //////////////////////////
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
    // can transfer own tokens
    if (from != Tezos.sender) {
        // operators can transfer tokens as well
        if (!isOperator((from, Tezos.sender, storage))) {
            failwith(errorNotOperator)
        } else { (); }
    } else { (); }
}

let defaultBalance: tokenBalance = 1n;
let defaultBalanceNoToken: tokenBalance = 0n;

let getTokenBalance = ((tokenId, tokenOwner, storage): (tokenId, tokenOwner, storage)): tokenBalance => {
    let tokensLedger: tokensLedger = storage.tokensLedger;
    let existingTokenOwner: option(tokenOwner) = Map.find_opt(tokenId, tokensLedger);
    switch (existingTokenOwner) {
        | None => (failwith(errorTokenUndefined): tokenBalance)
        /**
         * If the existing `tokenOwner` for the given `token_id`
         * does not equal the provided `from_` address, then fail.
         */
        | Some(existingTokenOwner) => if (tokenOwner == existingTokenOwner) {
            defaultBalance;
        } else {
            defaultBalanceNoToken;
        }
    };
}

////////////////////////////// BALANCEOF ////////////////////////////:///////
type balanceOfRequestsIteratorAccumulator = (list(balanceOfResponseMichelson), storage);
let balanceOfRequestsIterator = 
    ((accumulator, balanceOfRequestMichelson): (balanceOfRequestsIteratorAccumulator, balanceOfRequestMichelson)): balanceOfRequestsIteratorAccumulator => {
        let (balanceOfResponses, storage): balanceOfRequestsIteratorAccumulator = accumulator;
        let balanceOfRequest: balanceOfRequest = Layout.convert_from_right_comb(balanceOfRequestMichelson);
        let tokenBalance: tokenBalance = getTokenBalance((balanceOfRequest.token_id, balanceOfRequest.owner, storage));

        let balanceOfResponseAuxiliary: balanceOfResponseAuxiliary = {
            request: balanceOfRequestMichelson,
            balance: tokenBalance
        };

        let balanceOfResponseMichelson: balanceOfResponseMichelson = Layout.convert_to_right_comb(balanceOfResponseAuxiliary);
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

/////////////////////////////////////////////////// TRANSFER  //////////////////

let updateTokensLedger = ((from, fromTokenBalance, transferContents, storage): (tokenOwner, tokenBalance, transferContents, storage)): storage => {
    let tokensLedger = Map.update(
        // which `token_id` to update
        transferContents.token_id,
        // new `tokenOwner` for the `token_id` above
        Some(transferContents.to_),
        storage.tokensLedger
    );
    let storage = {
        ...storage,
        tokensLedger: tokensLedger
    };
    storage
};

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
        /**
         * Apply the transfer assuming it passed the validation checks above
         */
        let storage = updateTokensLedger((from_, fromTokenBalance, transferContents, storage));
        (storage, from_);
    }
};

let transferIterator = ((storage, transferMichelson): (storage, transferMichelson)): storage => {
    let transferAuxiliary: transferAuxiliary = Layout.convert_from_right_comb(transferMichelson);
    let from_: tokenOwner = transferAuxiliary.from_;
    /**
     * Validate each transfer
     */
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


/////////////////////////////////// PERMISSIONS  DESCRIPTOR  /////////////////
let permissionsDescriptor = ((permissionsDescriptorParameter, storage): (permissionsDescriptorParameter, storage)): entrypointReturn => {
    let permissionsDescriptorAuxiliary: permissionsDescriptorAuxiliary = {
        operator: Layout.convert_to_right_comb(currentPermissionsDescriptor.operator),
        receiver: Layout.convert_to_right_comb(currentPermissionsDescriptor.receiver),
        sender: Layout.convert_to_right_comb(currentPermissionsDescriptor.sender),
        // option type does not require a layout conversion
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
                // if there is an existing operator set, add an operator to it
                | Some(tokenOperatorsSet) => Some(Set.add(operatorParameter.operator, tokenOperatorsSet))
                // if there are no operators, create a new set with the given operator
                | None => Some(Set.literal([operatorParameter.operator]))
            }
        }
        | Remove_operator(n) => {
            switch (tokenOperatorsSet) {
                // if there is an existing operator set, remove an operator from it
                | Some(tokenOperatorsSet) => Some(Set.remove(operatorParameter.operator, tokenOperatorsSet))
                // if there are no operators, don't create a new set for a removal
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

let main = ((parameter, storage): entrypointParameter): entrypointReturn => {
    switch (parameter) {
        | Fa2 fa2 => {
            switch (fa2) {
            | Transfer(transferParameter) => transfer((transferParameter, storage))
            | Balance_of(balanceOfParameterMichelson) => balanceOf((balanceOfParameterMichelson, storage))
            | Permissions_descriptor(permissionsDescriptorParameter) => permissionsDescriptor((permissionsDescriptorParameter, storage))
            | Update_operators(updateOperatorsParameter) => updateOperators((updateOperatorsParameter, storage)) //([]: list(operation)), storage)
            }
        }
        | Asset ast => {
            switch (ast) {
            | Mint(mintParameter) => (([]: list(operation)), storage) //mint(mintParameter)
            | Burn(burnParameter) => (([]: list(operation)), storage) //burn(burnParameter)
            }
        } 
    }
}
