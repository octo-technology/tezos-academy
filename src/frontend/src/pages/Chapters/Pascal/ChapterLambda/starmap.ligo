// starmap.ligo
type coordinates is record [
  x : int;
  y : int;
  z : int
]
type planet_type is PLANET | ASTEROID | STAR
type planet is record [
  position : coordinates;
  mass : nat;
  category : planet_type
]
type planets is map (string, planet)
type storage is record[
  name : string;
  func : (planet) -> planet_type;
  celestialbodies : planets
]
type return is (list(operation)  * storage)

type parameter is DeduceCategoryChange of (planet) -> planet_type | AddPlanet of (string * planet) | DoNothing

function addPlanet (const input : (string * planet); const store : storage) : return is
block {
    const modified : planets = case Map.find_opt(input.0, store.celestialbodies) of
      Some (p) -> (failwith("planet already exist") : planets)
    | None -> Map.add (input.0, record[position=input.1.position;mass=input.1.mass;category=store.func(input.1)], store.celestialbodies)
    end;
} with ((nil :  list(operation)), record [name=store.name;func=store.func;celestialbodies=modified])

function deduceCategoryChange (const f : (planet) -> planet_type; const store : storage) : return is
block { 
  function applyDeduceCatg (const name : string; const p : planet) : planet is
      record [position=p.position;mass=p.mass;category=f(p)];
  const modified : planets = Map.map (applyDeduceCatg, store.celestialbodies);
} with ((nil :  list(operation)), record [name=store.name;func=f;celestialbodies=modified])

function main (const action : parameter; const store : storage) : return is
block { skip } with case action of
    AddPlanet (input) -> addPlanet (input,store)
  | DeduceCategoryChange (f) -> deduceCategoryChange (f,store)
  | DoNothing -> ((nil : list(operation)),store)
  end