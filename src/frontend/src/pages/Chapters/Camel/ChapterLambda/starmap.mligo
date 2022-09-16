type coordinates = { x : int; y : int; z : int }
type planet_type = PLANET | ASTEROID | STAR
type planet = {
  position : coordinates;
  mass : nat;
  category : planet_type
}
type planets = (string, planet) map
type storage = {
  name : string;
  func : (planet) -> planet_type;
  celestialbodies : planets
}
type return = (operation list * storage)

type parameter = DeduceCategoryChange of (planet) -> planet_type | AddPlanet of (string * planet) | DoNothing

let addPlanet (input, store : (string * planet) * storage) : return =
    let modified : planets = match Map.find_opt input.0 store.celestialbodies with
       Some (_p) -> (failwith("planet already exist") : planets)
     | None -> Map.add input.0 {position=input.1.position;mass=input.1.mass;category=store.func input.1} store.celestialbodies
    in
    (([] : operation list), {name=store.name;func=store.func;celestialbodies=modified})

let deduceCategoryChange (f,store : ((planet) -> planet_type) * storage) : return =
  let applyDeduceCatg = fun (_name,p : string * planet) ->
      {position=p.position;mass=p.mass;category=f p} in
  let modified : planets = Map.map applyDeduceCatg store.celestialbodies in
  (([] : operation list), {name=store.name;func=f;celestialbodies=modified})

let main ((action, store) : (parameter * storage)) : return =
  match (action) with
    AddPlanet (input) -> addPlanet ((input,store))
  | DeduceCategoryChange (f) -> deduceCategoryChange ((f,store))
  | DoNothing -> (([] : operation list),store)
  