# Chapter 11 : Lists and Sets

<dialog character="pilot">Please now plot our course as a list of destinations.</dialog>

Lists are linear collections of elements of the same type. Linear means that, in order to reach an element in a list, we must visit all the elements before (sequential access). Elements can be repeated, as only their order in the collection matters. The first element is called the head, and the sub-list after the head is called the tail.

## Lists

To define an empty list :

```
let empty_list: list<int> = list([]);
```

To define list with values:

```
let my_list: list<int> = list([1, 2, 2]); // The head is 1
```

You can add elements to an existing list using the cons operator _..._ :

```
let larger_list: list<int> = list([5, ...my_list]); // [5,1,2,2]
```

You cannot access element directly in list but you can access the first element, the head or the rest of the list, the tail. The two function to access those are List.head_opt and List.tail_opt

```
let head: option<int> = List.head_opt(my_list); // 1
let tail: option<list<int>> = List.tail_opt(my_list); // [2,2]
```

## Sets

Sets are unordered collections of values of the same type, like lists are ordered collections. Elements of sets in LIGO are unique, whereas they can be repeated in a list. To define an empty set:

```
let my_set: set<int> = Set.empty;
```

and non-empty set:

```
let my_set: set<int> = Set.add(3, Set.add(2, Set.add(2, Set.add(1, Set.empty as set<int>))));
```

You can test membership with the _Set.mem_ operator :

```
let contains_3: bool = Set.mem(3, my_set);
```

You can get the size of a set using the _Set.size_ operator :

```
let cardinal: nat = Set.size(my_set);
```

To update a set :

```
let larger_set: set<int> = Set.add(4, my_set);
let smaller_set: set<int> = Set.remove(3, my_set);
```

## Your mission

<!-- prettier-ignore -->1- Define a variable _itinary_ as a list of string names of celestial bodies representing your course. Start with _"earth"_

<!-- prettier-ignore -->2- On the next line, add _"sun"_ to the itinary.

<!-- prettier-ignore -->2- On the next line, add _"alpha-centauri"_ to the itinary.
