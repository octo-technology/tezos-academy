// Modify the code below
type coordinates is
    record [
        x : int;
        y : int;
        z : int
    ]

var earth_coordinates : coordinates :=
    record [
        x = 2;
        y = 7;
        z = 1
    ]

patch earth_coordinates with record [z = 5]