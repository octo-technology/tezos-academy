// Modify the code below
type coordinates =
    {
        x : int,
        y : int,
        z : int
    }

let earth_coordinates : coordinates =
    {
        x : 2,
        y : 7,
        z : 1
    };

let modified_earth_coordinates : coordinates = {...earth_coordinates, z : 5 };