type shipKey = string

type ship = {
    id: address,
    name: string,
    hostile: bool
}

type shipMap = map(shipKey, ship)

type centralStorage = shipMap

type actionRegister = {
  sKey : shipKey,
  sAddr : address,
  sName : string,
  sHostile : bool
}

type actionRetrieve = {
  sKey : shipKey,
  callbackAddress: address
}

type actionCentral =
| RegisterShip (actionRegister)
| RetrieveShip (actionRetrieve)
