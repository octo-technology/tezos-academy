type coordinates = (int * int * int)
type planet = {
    name : string;
    position : coordinates;
    density : nat;
    atmospheric_activity : bool
}

let star_map : planet list = [{
      name = "Earth";
      position = (0,0,0);
      density = 20n;
      atmospheric_activity = True
  };
  {
      name = "Jupiter";
      position = (2,7,1);
      density = 340n;
      atmospheric_activity = False
  };
  {
      name = "Methuselah";
      position = (2232,7423,12342);
      density = 44n;
      atmospheric_activity = False
  };
  {
      name = "Osiris";
      position = (134,454,1321);
      density = 165n;
      atmospheric_activity = True
  };
  {
      name = "Gliese";
      position = (234,8045,435);
      density = 11n;
      atmospheric_activity = True
  };
]


let scan (l : planet list) : planet =
    let destination : planet := record [name=""; position=(0,0,0); density=0n; atmospheric_activity=False];
  // Type your solution below
  
    let conditions (acc, p: planet list * planet) : planet list = if p.density > 100n and p.atmospheric_activity then p :: acc else acc
    let scan_results : planet list = List.fold conditions star_map []

    in destination