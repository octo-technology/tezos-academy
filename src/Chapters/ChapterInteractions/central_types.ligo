type shipKey is string;

type ship is record [
    id: address;
    name: string;
    hostile: bool;
]

type shipMap is map(shipKey, ship)

type centralStorage is shipMap

type actionRegister is record [
  sKey : shipKey;
  sAddr : address;
  sName : string;
  sHostile : bool;
]

type actionRetrieve is record [
  sKey : shipKey;
  callbackAddress: address;
]

type actionCentral is
| RegisterShip of actionRegister
| RetrieveShip of actionRetrieve
