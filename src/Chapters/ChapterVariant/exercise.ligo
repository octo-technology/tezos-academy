type ship is record [
  id : nat;
  name : string;
  firepower : nat;
  shield: nat
]

// Type your solution below (section 1)


function main (const p : unit; const store : unit) : (list(operation) * unit) is
  block {
    const ship1 : ship = record [
      id = 1n;
      name = "ship1";
      firepower = 20n;
      shield = 100n
    ];

    const ship2 : ship = record [
      id = 2n;
      name = "ship2";
      firepower = 90n;
      shield = 30n
    ];

    // Type your solution below (section 2)


    var defender_count: nat := 0n;
    var attacker_count: nat := 0n;
    case ship1_order of 
    | Defense -> defender_count := defender_count + 1n
    | Attack(n) -> attacker_count := attacker_count + 1n
    end;
    case ship2_order of 
    | Defense -> defender_count := defender_count + 1n
    | Attack(n) -> attacker_count := attacker_count + 1n
    end

  } with ((nil: list(operation)), unit)