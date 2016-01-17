-- Usage	: newList = powerList n
-- Before	: n is a positive integer or 0
-- After	: newList is a descending list of 2's with each element raised to 
--			  the power of the length of the list minus the positional value of 
--			  that element in the list

listAll f i n = do
	map f [i..n]

main = do
	print(listAll (\x -> x^2) 1 5)
