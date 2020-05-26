# Chapter 22 : Deploy & Invoke

<dialog character="admiral"> Time to go live.</dialog>


## Smart contract

A smart contract is code written in Michelson langage (a low-level stack-based turing-complete language). 
It contains entrypoints which describe all possible way to interact with a smart contract. 
It contains prototype of each entrypoint. What kind of parameters are exepected  to execute an entrypoint
It contains the description of storage.

### Storage

storage is an allocated memory space associated to smart contract. Storage is a persistent data for a smart contract.

The description of the storage is done by strongly-typing the data structure.

### Entrypoints

Entrypoints of a smart contract describe how to mutate a storage. 
Executing an entrypoint takes some parameters and a state of a storage and returns a new state of storage and some operations

               +--------------------+
entrypoint ->  |                    |  -> modified storage
parameters ->  |  smart contract    |  -> operations
storage    ->  |                    |
               +--------------------+

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
ligo compile-contract code.ligo mainFunc > code.tz
```
<mainFunc> argument is the name of the "main function" in the .ligo file. (see Chapter "Main Function").

⚠️ Notice the output of the command is the Michelson code. We just redirect the command output into a .tz file.

### Initial storage

Here is how to transform ligo expression into Michelson expression using the ligo compiler in command line.
```
ligo compile-storage [options] code.ligo mainFunc '<expression>'
```

<expression> is a ligo expression


### Invocation parameter

Here is how to transform ligo expression into Michelson expression using the ligo compiler in command line.
```
ligo compile-parameter [options] code.ligo mainFunc '<expression>'
```

<expression> is a ligo expression


### Simulating 

Here is how to simulate execution of an entrypoint using the ligo compiler in command line.
```
ligo dry-run [options] code.ligo mainFunc '<entrypoint(p)>' '<storage_state>'
```

<storage_state> state of the storage when simulating execution of the entrypoint
<entrypoint(p)> entrypoint of the smart contract that is invoked (parameter *p* of this entrypoint is specified between parantheses).

### Ligo Expression in command line

Let's see some exemple how to transpile a storage ligo expression into a michelson one.

Let's consider this smart contract which associate coordinates to a planet name.

```
// starmap.ligo
type coordinates is ( int * int * int)
type storage is map (string, coordinates)
type return is (list(operation)  * storage)

type parameter is AddPlanet of (string * coordinates) | DoNothing

function addPlanet (const input : (string * coordinates); const store : storage) : return is
block {
    const modified : storage = case Map.find_opt(input.0, store) of
      Some (p) -> (failwith("planet already exist") : storage)
    | None -> Map.add (input.0, input.1, store)
    end;
} with ((nil :  list(operation)), modified)

function main (const action : parameter; const store : storage) : return is
block { skip } with case action of
    AddPlanet (input) -> addPlanet (input,store)
  | DoNothing -> ((nil : list(operation)),store)
  end
```

#### Maps

The _map_ _end_ keywords can be used to initialize a *map*

The command line *ligo compile-storage* for transpiling a map containg a tuple.

```
ligo compile-storage starmap.ligo main 'map "earth" -> (1,1,1) end'
```

#### Tuples

Initialization of elements of a tuple is specified between _(_ and _)_ separated by comma _,_.

The command line *ligo compile-storage* for transpiling a map containg a tuple.
```
ligo compile-storage starmap.ligo main 'map "earth" -> (1,1,1) end'
```

This command returns :
```
{ Elt "earth" (Pair (Pair 1 1) 1) }
```

#### Record

Initialization of elements of a record is specified between _record[_ and _]_ separated by comma _;_. Each element is a key/value pair seperated by _->_ and follow the syntax :
```
record[ <key1> -> <value1>; <key2> -> <value2> ]
```

Let's modify our type *coordinates* to be a record instead of a tuple.

```
// starmap2.mligo
type coordinates = record [
  x = int;
  y = int;
  z = int
]

...

function main (const action : parameter; const store : storage) : return is
block { skip } with case action of
    AddPlanet (input) -> addPlanet (input,store)
  | DoNothing -> ((nil : list(operation)),store)
  end
```


The command line *ligo compile-storage* for transpiling a map containg a record tuple.
```
ligo compile-storage starmap2.ligo main 'map "earth" -> record [x=1;y=1;z=1] end'
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
type coordinates is record [
  x : int;
  y : int;
  z : int
]
type planets is map (string, coordinates)
type storage is record[
  name : string;
  system_planets : planets
]
type return is (list(operation)  * storage)

type parameter is AddPlanet of (string * coordinates) | DoNothing

function addPlanet (const input : (string * coordinates); const store : storage) : return is
block {
    const modified : planets = case Map.find_opt(input.0, store.system_planets) of
      Some (p) -> (failwith("planet already exist") : planets)
    | None -> Map.add (input.0, input.1, store.system_planets)
    end;
} with ((nil :  list(operation)), record [name=store.name;system_planets=modified])

function main (const action : parameter; const store : storage) : return is
block { skip } with case action of
    AddPlanet (input) -> addPlanet (input,store)
  | DoNothing -> ((nil : list(operation)),store)
  end
```



<!-- prettier-ignore -->1- Write _compile-storage_ command and the ligo expression for initializing the *Sol* system containing planet "earth" with coordinates (2,7,1).

<!-- prettier-ignore -->2- Write _dry-run_ command and the ligo expression for adding a planet "mars" with coordinates (4,15,2) in our *Sol* system. Reuse the *Sol* system of step 1.

