# Chapter 11 : Timestamps

## Now

You cannot get the current time in LIGO but you can get the starting time of the current block :

```
const today : timestamp = Tezos.now
```

## Arithmetics

In LIGO, timestamps can be added to integers :

```
const today : timestamp = Tezos.now
const one_day : int = 86_400
const in_24_hrs : timestamp = today + one_day
const some_date : timestamp = ("2000-01-01T10:10:10Z" : timestamp)
const one_day_later : timestamp = some_date + one_day
const in_24_hrs : timestamp = today - one_day
```

## Comparison

You can compare timestamps using the same comparison operators applying to numbers.

```
const not_tommorow : bool = (Tezos.now = in_24_hrs)
```

## Your mission

You received a laserbeam message from Interstellar Academy: "Time is almost up for your training. Real first test will be soon".

<!-- prettier-ignore -->
In the _ship_ record, add a *created\_at* key and implement it using the Now Timestamp.
