docker run --rm -v "$PWD":"$PWD" -w "$PWD" ligolang/ligo:next compile storage exercise.religo '{ name= "3"; item_id= 2n; cost= 1n }'
# output is (Pair 1 2 "3")


