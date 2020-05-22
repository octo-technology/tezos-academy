type coordinates = (int, int, int)
type planet = {
    name : string,
    position : coordinates,
    density : nat,
    atmospheric_activity : bool
}

let star_map : list(planet) = [{
      name : "Earth",
      position : (0,0,0),
      density : 20n,
      atmospheric_activity : true
  },
  {
      name : "Jupiter",
      position : (2,7,1),
      density : 340n,
      atmospheric_activity : false
  },
  {
      name : "Methuselah",
      position : (2232,7423,12342),
      density : 44n,
      atmospheric_activity : false
  },
  {
      name : "Osiris",
      position : (134,454,1321),
      density : 165n,
      atmospheric_activity : true
  },
  {
      name : "Gliese",
      position : (234,8045,435),
      density : 11n,
      atmospheric_activity : true
  },
]
// Type your solution below
let conditions = ((acc, p): (list(planet), planet)) : list(planet) => if ((p.density > 100n) && p.atmospheric_activity) { [p, ...acc] } else { acc };
let scan = (l : list(planet)) : list(planet) => List.fold (conditions, l, ([]: list(planet)));

let scan_results : list(planet) = scan (star_map);