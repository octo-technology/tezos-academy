# Chapter 22 : Lambda (anonymous function)

<dialog character="scientist">Captain, maybe you should think of updating our starmap referencement, it's not like this was introduced by the ICA like 1,000 years ago...</dialog>

## Versioning

Tezos as a public blockchain expects that contracts should have the same behaviour for all users. In theory, once a contract is deployed, it should not be changed.

We call _antipattern_ a smart contract that has a special role (admin) or may be evolving (changing the rules of the smart contract).

The need to modify the behaviour of a smart contract emerges when for example the laws of a country have changed and you need to apply the same changes to the rules in your smart contract.
One could write a new smart contract (V2) and deploy it but it would imply that all existing information stored in the storage of the old smart contract (V1) would be lost. This problem can be solved by :
1- migrating storage information through transactions,
2- or by forcing the new contract to request storage data from the old contract,
3- or by customizing the contract implementation.

In this chapter we will focus on the third solution.

### Versioning by re-emission

Versioning can be done by writing a new smart contract and emitting transactions from the old contract (V1) to migrate storage information to the new contract (V2). This may require a lot of transactions and thus a lot of fees (resulting in a significant price). This price could be paid by the smart contract that would emit transactions or by each user which would invoke a "migrate" entrypoint of V1 contract to send storage information to the new contract. Transaction emission has been seen in chapter 17 with the _Tezos.transaction_ predefined function.

### Versioning by contract communication

Versioning can be done by writing a new smart contract that can ask information to the old contract. This pattern needs a 2-way communication where the new contract sends a "request" transaction and reacts when the old contract is sending back the requested information. Execution of entrypoint would become asynchronous (due to the 2-way transactions). The old contract V1 must be implemented in a way that allows to send transaction to a not yet deployed contract (see chapter Polymorphism).

### Versioning by lambda

Versioning can be done by writing a single smart contract that can change its properties and functions (lambdas). This implies to be able to forecast what kind of change might be needed. It also implies a special admin role who is allowed to change the behavior of the smart contract. The admin role could be a multi-signature pattern that allows changing the behavior of the smart contract if enough user agree on the proposed change.

## Lambda

Changing the behavior of a smart contract can be done by customizing the implementation through lambda functions. The idea is to implement smart contract logic in a lambda funtion that can be modified after the contract deployment.

This pattern requires to:

- define an anonymous function in the storage which is called by an entrypoint
- write a new entrypoint that allows to change the implementation of this anonymous function.

Let's consider the "starmap" smart contract :

```
// starmap.ligo
type coordinates = { x : int, y : int, z : int }
type planets = map (string, coordinates)
type storage = {
  name : string,
  func : ((coordinates) => coordinates),
  systemplanets : planets
}
type return = (list(operation), storage)

type parameter = ChangeFunc ((coordinates) => coordinates) | AddPlanet ((string, coordinates)) | DoNothing

let addPlanet = ((input, store) : ((string, coordinates), storage)) : return =>
{
    let modified : planets = switch (Map.find_opt(input[0], store.systemplanets)) {
     | Some (p) => (failwith("planet already exist") : planets)
     | None => Map.add (input[0], store.func(input[1]), store.systemplanets)
    };
    (([] :  list(operation)), {name:store.name,func:store.func,systemplanets:modified});
}

let changeFunc = ((f,store) : (((coordinates) => coordinates), storage)) : return =>
  (([] :  list(operation)), {name:store.name,func:f,systemplanets:store.systemplanets})

let main = ((action, store) : (parameter, storage)) : return =>
  switch (action) {
  | AddPlanet (input) => addPlanet ((input,store))
  | ChangeFunc (f) => changeFunc ((f,store))
  | DoNothing => (([] : list(operation)),store)
  }
```

## Lambda prototype

The prototype of a lambda follows the following syntax :

```
((<parameter_type1>,<parameter_type2>) => <returned type>)
```

In the "starmap" smart contract, the type of _func_ is

```
((coordinates) => coordinates)
```

⚠️ Note that lambda function _func_ takes as parameter some coordinates of a planet and returns coordinates of a planet as well.

## Lambda call

Anonymous functions can be called like other functions. Here in our example, the lambda _func_ is called in _addPlanet_ to transform the planet's coordinates :

```
Map.add (input[0], store.func(input[1]), store.systemplanets)
```

## Lambda definition

The implementation of the lambda can be changed with the _changeFunc_ function which assigns new code to _func_. Here is an example of execution of the _ChangeFunc_ entrypoint with the simulation ligo command line :

```
ligo dry-run lambda.religo main 'ChangeFunc((c : coordinates) : coordinates => {x:c.x*100,y:c.y,z:c.z})' '{name:"Sol",func:((c : coordinates) : coordinates => {x:c.x*10,y:c.y,z:c.z}),systemplanets:Map.literal([("earth", {x:2,y:7,z:1})])}'
```

⚠️ Notice that the new implementation of _func_ multiplies the 'x' coordinate by 100 (defined as parameter of _ChangeFunc_ entrypoint)

⚠️ Notice that the old implementation of _func_ multiplies the 'x' coordinate by 10 (defined in storage)

## Your mission

We have a smart contract that registers planets of the Sol system. Since the beginning of the project, all celestial bodies were considered as planets.
Since 2006, the IAU decided that celetial bodies with a mass under 100 megatons are not considered as a planet but as a dwarf-planet. Hopefully we forecasted this kind of change! A _DeduceCategoryChange_ entrypoint allows us to change the lambda which determines the category of a celestial body. All we have to do is define the new rule and all registered celestial bodies will be updated.

Take a look at the starmap contract in the editor tabs.

⚠️ Notice that the function _deduceCategoryChange_ allows to specify a new deduction function _f_ which is assign to the lambda _func_ with :

```
{name:store.name, func:f, celestialbodies:modified}
```

⚠️ Notice that in the function _deduceCategoryChange_ the sub-function _applyDeduceCatg_ applies the new category deduction to a planet (_category:f(p)_).

```
let applyDeduceCatg = ((name,p) : (string, planet)) : planet =>
    {position:p.position, mass:p.mass, category:f(p)};
```

⚠️ Notice that in the function _deduceCategoryChange_ the sub-function _applyDeduceCatg_ is used to update all entries of the _celestialbodies_ map with :

```
Map.map (applyDeduceCatg, store.celestialbodies);
```

We want you to update our "starmap" contract in order to take this new rule into account.

<!-- prettier-ignore -->1- Write the _dry-run_ command and the associated invocation (entrypoint) for taking the new rule into account.

<!-- prettier-ignore -->2- First rule : if the coordinates of a planet is (0,0,0) then the celestial body is considered as a STAR.

<!-- prettier-ignore -->3- Second rule : if the mass of a planet is above 100 then the celestial body is considered as a PLANET.

<!-- prettier-ignore -->4- Third rule : if the mass of a planet is under 100 then the celestial body is considered as an ASTEROID.
