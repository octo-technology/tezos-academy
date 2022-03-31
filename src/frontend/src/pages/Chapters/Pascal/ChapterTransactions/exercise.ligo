type command is record [
    item : nat;
    price : tez
]

type mainAction is Pay of command | Buy

type storage is unit

type return is list(operation) * storage

function purchase (const _item : nat; const purchase_price : tez; const s : storage) : return is
block {
    const ship_address : address = ("tz1TGu6TN5GSez2ndXXeDX6LgUDvLzPLqgYV" : address);
    const vendor_address : address = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);

    if Tezos.source =/= ship_address then failwith ("Access denied");
    if Tezos.amount =/= purchase_price then failwith ("Incorrect amount");

    const vendor_contract : contract (unit) =
      case (Tezos.get_contract_opt (vendor_address) : option (contract (unit))) of [
        Some (c) -> c
      | None -> (failwith ("Contract not found.") : contract (unit))
      ];
    // Type your solution below
    
} with ((nil: list(operation)), s)

function main (const action : mainAction; const store : storage): return is
  case action of [
    Pay (cmd) -> purchase (cmd.item, cmd.price, store)
  | Buy -> (failwith("not implemented"): return)
  ]
