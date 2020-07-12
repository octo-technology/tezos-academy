# Chapter 23 : Deploy contract

<dialog character="admiral"> Time to go live.</dialog>

## Smart contract

A smart contract is code written in Michelson langage (a low-level stack-based turing-complete language).
It contains entrypoints which describe all possible way to interact with a smart contract.
It contains prototype of each entrypoint. What kind of parameters are exepected to execute an entrypoint
It contains the description of storage.

### Storage

storage is an allocated memory space associated to smart contract. Storage is a persistent data for a smart contract.

The description of the storage is done by strongly-typing the data structure.

### Entrypoints

Entrypoints of a smart contract describe how to mutate a storage.
Executing an entrypoint takes some parameters and a state of a storage and returns a new state of storage and some operations

![](/images/contract_in_out.png)

Execution of an entrypoint produces a new state of the storage of the smart contract. If executopn did not throw an exception and did not fail then the new state of storage is applied.

Operations are transactions (smart contract invocation) that will be sent to some other contracts and will trigger an entryppoint of the targeted contract or a tez transfer (no invocation of entrypoint). If execution of an entrypoint produces operations (ordered list of transactions) then they are sent and executed following order of the list of operation.

## Deploy

A smart contract must be deployed to the blockchain in order to be invoked. When deploying a smart contract ot the blockchain , one must specify the initial state of the storage.
Deployment of a smart contract in Tezos is called "origination".
Here is the syntax of the tezos command line to deploy a smart contract :

```
tezos-client originate contract <contract_name> for <user> transferring <amount> from <from_user> \
             running <tz_file> \
             --init '<initial_storage>' --burn-cap <gaz>
```

<contract_name> name given to the contract
<tz_file> path of the Michelson smart contract code (TZ file).
<amount> is the quantity of tez being transfered to the newly deployed contract. if a contract balance reaches 0 then it is deactivated.
<from_user> account from which the tez are taken from (and given transfered to the new contract).
<initial_storage> is a Michelson expression. The --init parameter is used to specify initial state of the storage.
<gaz> it specifies the the maximal fee the user is willing to pay for this operation (using the --burn-cap parameter).

## Invoke

Once the smart contract has been deployed on the blockchain (contract-origination operation baked into a block), it is possible to invoke an entrypoint of the smart contract using the command line.

Here is the syntax of the tezos command line to invoke a smart contract :

```
tezos-client transfer <amount> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
```

<amount> is the quantity of tez being transfered to the contract.
<contract_name> name given to the contract
<entrypoint_invocation> name of the entrypoint and corresponding parameters. exemple 'Increment(5)'.

⚠️ Notice the --arg parameter specifies an entrypoint call.

⚠️ Notice the --dry-run parameter simulate invocation of the entrypoint.

## Ligo compiler

In order to produce a smart contract, a tool called transpiler (aka LIGO compiler) is used to transform LIGO code into Michelson code.
Michelson smart contract are stored in a file with .tz extension.

This ligo compiler is also used to transform "Ligo expression" into "Michelson expression" as needed to deploy or invoke a smart contract.

### Compile

Here is how to transform ligo code into Michelson code using the ligo compiler in command line.

```
ligo compile-contract code.mligo mainFunc > code.tz
```

<mainFunc> argument is the name of the "main function" in the .ligo file. (see Chapter "Main Function").

⚠️ Notice the output of the command is the Michelson code. We just redirect the command output into a .tz file.

### Initial storage

Here is how to transform ligo expression into Michelson expression using the ligo compiler in command line.

```
ligo compile-storage [options] code.mligo mainFunc '<expression>'
```

<expression> is a ligo expression

### Invocation parameter

Here is how to transform ligo expression into Michelson expression using the ligo compiler in command line.

```
ligo compile-parameter [options] code.mligo mainFunc '<expression>'
```

<expression> is a ligo expression

### Simulating

Here is how to simulate execution of an entrypoint using the ligo compiler in command line.

```
ligo dry-run [options] code.mligo mainFunc '<entrypoint(p)>' '<storage_state>'
```

<storage*state> state of the storage when simulating execution of the entrypoint
<entrypoint(p)> entrypoint of the smart contract that is invoked (parameter \_p* of this entrypoint is specified between parantheses).

### Ligo Expression in command line

Let's see some exemple how to transpile a storage ligo expression into a Michelsonone.

Let's consider this smart contract which associate coordinates to a planet name.

```
// starmap.mligo
type coordinates = ( int * int * int)
type storage = (string, coordinates) map
type return = (operation list * storage)

type parameter = AddPlanet of (string * coordinates) | DoNothing

let addPlanet (input,store : (string * coordinates) * storage) : return =
    let modified : storage = match Map.find_opt input.0 store with
      Some (p) -> (failwith("planet already exist") : storage)
    | None -> Map.add input.0 input.1 store
    in
    (([] : operation list), modified)

let main (action,store : parameter * storage): return =
  match action with
    AddPlanet input -> addPlanet (input,store)
  | DoNothing -> (([] : operation list),store)
```

#### Maps

The _Map.literal_ predifined function can be used to initialize a _map_

The command line _ligo compile-storage_ for transpiling a map containg a tuple.

```
ligo compile-storage starmap.mligo main 'Map.literal [("earth", (1,1,1))]'
```

#### Tuples

Initialization of elements of a tuple is specified between _(_ and _)_ separated by comma _,_.

The command line _ligo compile-storage_ for transpiling a map containg a tuple.

```
ligo compile-storage starmap.mligo main 'Map.literal [("earth", (1,1,1))]'
```

This command returns :

```
{ Elt "earth" (Pair (Pair 1 1) 1) }
```

#### Record

Initialization of elements of a record is specified between _{_ and _}_ separated by comma _;_. Each element is a key/value pair seperated by _=_ and follow the syntax :

```
{ <key1> = <value1>; <key2> = <value2> }
```

Let's modify our type _coordinates_ to be a record instead of a tuple.

```
// starmap2.mligo
type coordinates = {
  x = int;
  y = int;
  z = int
}

...

let main (action,store : parameter * storage): return =
  match action with
    AddPlanet input -> addPlanet (input,store)
  | DoNothing -> (([] : operation list),store)
```

The command line _ligo compile-storage_ for transpiling a map containg a record tuple.

```
ligo compile-storage starmap2.mligo main 'Map.literal [("earth", {x=1;y=1;z=1})]'
```

This command returns :

```
{ Elt "earth" (Pair (Pair 1 1) 1) }
```

⚠️ Notice the record is tranformed into pairs (same for tuples).

## Your mission

We want to prepare the initial state of our star system database before deploying the following smart contract. Just to be sure everything works as expected it would be nice to simulate our entrypoint _AddPlanet_.

```
//starmap3.mligo
type coordinates = { x : int; y : int; z : int}
type planets = (string, coordinates) map
type storage = {
  name : string;
  systemplanets : planets
}

type return = (operation list * storage)

type parameter = AddPlanet of (string * coordinates) | DoNothing

let addPlanet (input,store : (string * coordinates) * storage) : return =
    let modified : planets = match Map.find_opt input.0 store.systemplanets with
      Some (p) -> (failwith("planet already exist") : planets)
    | None -> Map.add input.0 input.1 store.systemplanets
    in
    (([] : operation list), {name = store.name; systemplanets = modified})

let main (action,store : parameter * storage): return =
  match action with
    AddPlanet input -> addPlanet (input,store)
  | DoNothing -> (([] : operation list),store)
```

<!-- prettier-ignore -->1- Write _compile-storage_ command and the ligo expression for initializing the *Sol* system containing planet "earth" with coordinates (2,7,1).

<!-- prettier-ignore -->2- Write the _dry-run_ command and the ligo expression for adding a planet "mars" with coordinates (4,15,2) in our *Sol* system. Reuse the *Sol* system of step 1.
