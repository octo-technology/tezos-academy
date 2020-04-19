// Modify the code below
type coordinates is
    record [
        x : nat;
        y : nat;
        z : nat
    ]

var earth_coordinates : coordinates :=
    record [
        x = 2;
        y = 7;
        z = 1
    ]

earth_coordinates : coordinates = earth_coordinates with record [earth_coordinates.z = 5]