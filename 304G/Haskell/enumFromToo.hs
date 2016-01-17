-- Usage	: newList = powerList n
-- Before	: n is a positive integer or 0
-- After	: newList is a descending list of 2's with each element raised to 
--			  the power of the length of the list minus the positional value of 
--			  that element in the list

enumFromToo n m = do
	let helper n m newList = do
		if n <= m
			then helper n (m-1) (m : newList)
		else newList
	helper n m []


main = do
	print(enumFromToo 1 4)