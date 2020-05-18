type coordinates is (int * int * int)
type planet is
    record [
        name : string;
        position : coordinates;
        density : nat;
        atmospheric_activity : bool
    ]

var star_map : list (planet) := list [
  record [
      name = "Earth";
      position = (0,0,0);
      density = 20n;
      atmospheric_activity = True
  ];
  record [
      name = "Jupiter";
      position = (2,7,1);
      density = 340n;
      atmospheric_activity = False
  ];
  record [
      name = "Methuselah";
      position = (2232,7423,12342);
      density = 44n;
      atmospheric_activity = False
  ];
  record [
      name = "Osiris";
      position = (134,454,1321);
      density = 165n;
      atmospheric_activity = True
  ];
  record [
      name = "Gliese";
      position = (234,8045,435);
      density = 11n;
      atmospheric_activity = True
  ];
]

function scan (const l : list (planet)) : planet is block {
  var destination : planet := record [name=""; position=(0,0,0); density=0n; atmospheric_activity=False];
  // Type your solution below
  for i in list l block {
    if i.density > 100n and i.atmospheric_activity then destination := i
    else skip;
  }
} with destination