type coordinates is (nat * nat * nat)
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
      density = 20;
      atmospheric_activity = True
  ];
  record [
      name = "Jupiter";
      position = (2,7,1);
      density = 340;
      atmospheric_activity = False
  ];
  record [
      name = "Methuselah";
      position = (2232,7423,12342);
      density = 44;
      atmospheric_activity = False
  ];
  record [
      name = "Osiris";
      position = (134,454,1321);
      density = 165;
      atmospheric_activity = True
  ];
  record [
      name = "Gliese";
      position = (234,8045,435);
      density = 11;
      atmospheric_activity = True
  ];
]

function scan (var l : list (planet)) : planet is block {
  var destination : planet;
  // Type your solution below

} with destination