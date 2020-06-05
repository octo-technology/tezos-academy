type coordinates = { x : int, y : int, z : int }
type planet_type = PLANET | ASTEROID | STAR
type planet = {
  position : coordinates,
  mass : nat,
  category : planet_type
}
type planets = map (string, planet)
type storage = {
  name : string,
  func : ((planet) => planet_type),
  celestialbodies : planets
}
type return = (list(operation), storage)

type parameter = DeduceCategoryChange ((planet) => planet_type) | AddPlanet ((string, planet)) | DoNothing

let addPlanet = ((input, store) : ((string, planet), storage)) : return =>
{
    let modified : planets = switch (Map.find_opt(input[0], store.celestialbodies)) {
     | Some (p) => (failwith("planet already exist") : planets)
     | None => Map.add (input[0], {position:input[1].position,mass:input[1].mass,category:store.func(input[1])}, store.celestialbodies)
    };
    (([] :  list(operation)), {name:store.name,func:store.func,celestialbodies:modified});
}

let deduceCategoryChange = ((f,store) : (((planet) => planet_type), storage)) : return =>
{
  let applyDeduceCatg = ((name,p) : (string, planet)) : planet =>
      {position:p.position,mass:p.mass,category:f(p)};
  let modified : planets = Map.map (applyDeduceCatg, store.celestialbodies);
  (([] :  list(operation)), {name:store.name,func:f,celestialbodies:modified})
}

let main = ((action, store) : (parameter, storage)) : return =>
  switch (action) {
  | AddPlanet (input) => addPlanet ((input,store))
  | DeduceCategoryChange (f) => deduceCategoryChange ((f,store))
  | DoNothing => (([] : list(operation)),store)
  }