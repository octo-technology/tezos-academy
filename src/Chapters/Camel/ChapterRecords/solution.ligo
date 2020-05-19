// Modify the code below
type coordinates = {
    x : int;
    y : int;
    z : int
}

let earth_coordinates : coordinates = 
{
    x = 2;
    y = 7;
    z = 1
}

let change_coord_z (point, zval : coordinates * int) : coordinates =
{ point with z = zval }

let modified_earth_coordinates : coordinates = change_coord_z (earth_coordinates,5)