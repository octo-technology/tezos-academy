# Chapter 11 : Lists and Sets

<dialog character="pilot">You should now plot our course.</dialog>

Lists are linear collections of elements of the same type. Linear means that, in order to reach an element in a list, we must visit all the elements before (sequential access). Elements can be repeated, as only their order in the collection matters. The first element is called the head, and the sub-list after the head is called the tail.

## Lists

To define an empty list :

```
const empty_list : list (int) = list []
```

To define list with values:

```
const my_list : list (int) = list [1; 2; 2]
```

You can add elements to an existing list using the cons operator _#_ :

```
const larger_list : list (int) = 5 # my_list // [5; 1; 2; 2]
```

## Sets

Sets are unordered collections of values of the same type, like lists are ordered collections. Elements of sets in LIGO are unique, whereas they can be repeated in a list. To define a set :

```
const my_set : set (int) = set [3; 2; 2; 1]

```

You can test membership with the _contains_ operator :

```
const contains_3 : bool = my_set contains 3
```

You can get the size of a set using the _Set.size_ operator :

```
const cardinal : nat = Set.size (my_set)
```

To update a set :

```
const larger_set  : set (int) = Set.add (4, my_set)
const smaller_set : set (int) = Set.remove (3, my_set)
```

## Your mission

<!-- prettier-ignore -->1- Define _itinary_ as a list of string names of celestial bodies representing your course. Start with _"earth"_

<!-- prettier-ignore -->2- On the next line, add _"sun"_ to the itinary.

<!-- prettier-ignore -->2- On the next line, add _"alpha-centory"_ to the itinary.
