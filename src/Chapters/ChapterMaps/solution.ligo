type coordinates is (nat * nat * nat)
// Type your solution below
type name_to_coordinates is map (string, coordinates)
const star_map : planet_to_coordinates =
    map [
        "earth" -> (2,7,1);
        "sun" -> (0,0,0);
        "alpha-centauri" -> (2232,7423,12342)
    ]
