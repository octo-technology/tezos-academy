type coordinates = (int, int, int)
// Type your solution below
type name_to_coordinates = map (string, coordinates)
let star_map : name_to_coordinates =
    Map.literal ([
        ("earth", (2,7,1)),
        ("sun", (0,0,0)),
        ("alpha-centauri", (2232,7423,12342))]);
