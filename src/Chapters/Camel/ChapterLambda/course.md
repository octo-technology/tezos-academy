# Chapter 23 : Versioning and Lambda (anonymous function)

<dialog character="alien">red alert the humans are here battle station surrender dirty humans or die we are the master of this universe and we will easily destroy you hahahaha</dialog>


## Versioning

Tezos as a public blockchain expects that contracts should have same behaviour for all users. In theory once a contract is deployed, it should be changed. 

We call *antipattern* when a smart contract have special role (admin) or smart contract that may be evolving (changing rules of the smart contract).

The need to modify the behaviour of a smart contract emerges when for exemple the law of the country has changed and you need to apply the same changes to the rules of your smart contract.
One could write a new smart contract (V2) and deploy it but it would imply that all existing information stored in the storage of the old smart contract (V1) would be lost. This problem can be solved by
    * *Versioning by re-emission*   
    * *Versioning by contract communication* : 
    * *Versioning by lambda* :  

### Versioning by re-emission

Versioning can be done by writing a new smart contract and emitting transactions from the old contract (V1) to migrate storage information to the new contract (V2). This can require a lot of transactions and thus a lot of fee spent (resulting in a non negligeable price). This price could be paid by the smart contract that would emit transactions or by each user which would invoke a "migrate" entrypoint of V1 contract to send storage information to the new contract. Transaction emission has been seen in chapter 17 with the _Tezos.transaction_ predefined function.

### Versioning by contract communication

Versioning can be done by writing a new smart contract that can ask information to the old contract. This pattern need a 2-way communication where the new contract sends a "request" transaction and reacts when the old contract is sending back the requested information. Execution of entrypoint would become asynchronous (due to 2-way transactions). The old contract V1 must be implemented in a way to allow to send transaction to a not yet deployed contract (see chapter Polymorphism).

### Versioning by lambda

Versioning can be done by writing a single smart contract that can change its properties and functions (lambdas). This implies to be able to forecast what kind of change might be needed. It also implies a special admin role who is allowed to change the behavior of smart contract. The admin role could be a multi-signature pattern that allow changing behavior of the smart contract if enough user agreed on the proposed change.

## Lambda

So the idea is to :
* define an anonymous function in the storage which is called in entrypoint
* write an entrypoint that allow to change implementation of this anonymous function 

Let's consider the "starmap" smart contract 
```
// starmap.ligo
type coordinates = { x : int; y : int; z : int }
type planets = (string, coordinates) map
type storage = {
  name : string;
  func : ((coordinates) -> coordinates);
  system_planets : planets
}
type return = (operation list * storage)

type parameter = ChangeFunc of (coordinates) -> coordinates | AddPlanet of (string * coordinates) | DoNothing

let addPlanet (input, store : (string * coordinates) * storage) : return =
    let modified : planets = match Map.find_opt input.0 store.system_planets with
       Some (p) -> (failwith("planet already exist") : planets)
     | None -> Map.add input.0 (store.func input.1) store.system_planets
    in
    (([] : operation list), {name=store.name;func=store.func;system_planets=modified})

let changeFunc (f,store : ((coordinates) -> coordinates) * storage) : return =
  (([] : operation list), {name=store.name;func=f;system_planets=store.system_planets})

let main ((action, store) : (parameter * storage)) : return =
  match (action) with
    AddPlanet (input) -> addPlanet ((input,store))
  | ChangeFunc (f) -> changeFunc ((f,store))
  | DoNothing -> (([] : operation list),store)
```


## Lambda prototype

Defining the prototype of an anonymous function (lambda) follow the syntax :
```
(<parameter_type1>,<parameter_type2>) -> <returned type>
```

In "starmap" smart contract the type of *func* is 
```
(coordinates) -> coordinates
```
⚠️ Note that *func* is transforming coordinates of a planet into coordinates of a planet.

## Lambda call

Anonymous functions can be called like other functions. Here in our exemple, the lambda *func* is called in function *addPlanet* to transform planet's coordinates : 
```
Map.add input.0 (store.func input.1) store.system_planets
```

## Lambda definition

Defining a lambda in a ligo expression follows the syntax :
```
fun (<parameter_name> : <parameter_type>) -> <body>
```

The implementation of the lambda can be change with the *changeFunc* function which assigns new code to *func*. Here is an exemple of execution of the *ChangeFunc* entrypoint with the simulation ligo command line :  
```
ligo dry-run lambda.mligo main 'ChangeFunc(fun (c : coordinates) -> {x=c.x*100;y=c.y;z=c.z})' '{name="Sol";func=(fun (c : coordinates) -> {x=c.x*10;y=c.y;z=c.z});system_planets=Map.literal [("earth", {x=2;y=7;z=1})] }'

```

⚠️ Notice the returned type of the lambda is not specified
```
fun (c : coordinates) -> {x=c.x*100;y=c.y;z=c.z}
```

⚠️ Notice the new implementation of *func* multiplies 'x' coordinate by 100 (defined as parameter of *ChangeFunc* entrypoint)

⚠️ Notice the old implementation of *func* multiplies 'x' coordinate by 10 (defined in storage)



## Your mission

We have a smart contract that reference planets is the Sol system. Since the beginning of the project , all celestial bodies were considered as planets. 
Since 2006, the IAU decided that celetial bodies with a mass under 100 are not considered as a planet but as a dwarf-planet. Hopefully we forecasted this kind of change ! A *DeduceCategoryChange* entrypoint allows us to change the lambda which determines the category of a celestial body. (All we have to do is define the new rule and all registered celestial bodies will be updated). 

Take a look at the starmap contract :
```
// starmap.ligo
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
  celestial_bodies : planets
}
type return = (operation list * storage)

type parameter = DeduceCategoryChange of (planet) -> planet_type | AddPlanet of (string * planet) | DoNothing

let addPlanet (input, store : (string * planet) * storage) : return =
    let modified : planets = match Map.find_opt input.0 store.celestial_bodies with
       Some (p) -> (failwith("planet already exist") : planets)
     | None -> Map.add input.0 {position=input.1.position;mass=input.1.mass;category=store.func input.1} store.celestial_bodies
    in
    (([] : operation list), {name=store.name;func=store.func;celestial_bodies=modified})

let deduceCategoryChange (f,store : ((planet) -> planet_type) * storage) : return =
  let applyDeduceCatg = fun (name,p : string * planet) ->
      {position=p.position;mass=p.mass;category=f p} in
  let modified : planets = Map.map applyDeduceCatg store.celestial_bodies in
  (([] : operation list), {name=store.name;func=f;celestial_bodies=modified})

let main ((action, store) : (parameter * storage)) : return =
  match (action) with
    AddPlanet (input) -> addPlanet ((input,store))
  | DeduceCategoryChange (f) -> deduceCategoryChange ((f,store))
  | DoNothing -> (([] : operation list),store)
```

⚠️ Notice in the function *deduceCategoryChange* allows to specify a new deduction function *f* which is assign to the lambda *func* with :
```
{name=store.name;func=f;celestial_bodies=modified}
```

⚠️ Notice in the function *deduceCategoryChange* the sub-function *applyDeduceCatg* apply the new category deduction to a planet (_category=f(p)_). 
```
let applyDeduceCatg = fun (name,p : string * planet) ->
      {position=p.position;mass=p.mass;category=f p} in
```

⚠️ Notice in the function *deduceCategoryChange* the *applyDeduceCatg* function is used to update all entries of the *celestial_bodies* map with : 
 ```
Map.map applyDeduceCatg store.celestial_bodies
 ```



 


We want you to update our "starmap" contract in order to take this new rule into account. 


<!-- prettier-ignore -->1- Write _dry-run_ command and the associated invocation (entrypoint) for taking the new rule into account.

<!-- prettier-ignore -->2- First rule : if coordinates of a planet is (0,0,0) then celestial body is considered as a STAR.

<!-- prettier-ignore -->3- Second rule : if mass of a planet is above 100 then celestial body is considered as a PLANET.

<!-- prettier-ignore -->4- Third rule : if mass of a planet is under 100 then celestial body is considered as an ASTEROID.



expected storage after simulation : 
```
( LIST_EMPTY() ,
  record[celestial_bodies -> MAP_ADD("earth" ,
                                     record[category -> PLANET(unit) ,
                                            mass -> +1000 ,
                                            position -> record[x -> 2 ,
                                                               y -> 7 ,
                                                               z -> 1]] ,
                                     MAP_ADD("pluto" ,
                                             record[category -> ASTEROID(unit) ,
                                                    mass -> +10 ,
                                                    position -> record[x -> 200 ,
                                                                    y -> 750 ,
                                                                    z -> 100]] ,
                                             MAP_ADD("sun" ,
                                                     record[category -> STAR(unit) ,
                                                            mass -> +1000000 ,
                                                            position -> record[x -> 0 ,
                                                                    y -> 0 ,
                                                                    z -> 0]] ,
                                                     MAP_EMPTY()))) ,
         func -> "[lambda of type: (lambda\n   (pair (pair (or %category (or (unit %aSTEROID) (unit %pLANET)) (unit %sTAR)) (nat %mass))\n         (pair %position (pair (int %x) (int %y)) (int %z)))\n   (or (or (unit %aSTEROID) (unit %pLANET)) (unit %sTAR))) ]" ,
         name -> "Sol"] )
```