// Modify the code below
type coordinates = {
  x: int,
  y: int,
  z: int
};

let earth_coordinates: coordinates = {
    x: 2 as int,
    y: 7 as int,
    z: 1 as int,
}

earth_coordinates = ({...earth_coordinates, z: 5}) 
