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
      atmospheric_activity = true
  };
  {
      name = "Jupiter";
      position = (2,7,1);
      density = 340n;
      atmospheric_activity = false
  };
  {
      name = "Methuselah";
      position = (2232,7423,12342);
      density = 44n;
      atmospheric_activity = false
  };
  {
      name = "Osiris";
      position = (134,454,1321);
      density = 165n;
      atmospheric_activity = true
  };
  {
      name = "Gliese";
      position = (234,8045,435);
      density = 11n;
      atmospheric_activity = true
  };
]
// Type your solution below
let conditions (acc, p: planet list * planet) : planet list = if p.density > 100n && p.atmospheric_activity then p :: acc else acc
let scan (l : planet list) : planet list = List.fold conditions l ([]: planet list)

let scan_results : planet list = scan star_map 