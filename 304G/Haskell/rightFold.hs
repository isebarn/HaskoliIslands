-- Usage	: newList = powerList n
-- Before	: n is a positive integer or 0
-- After	: newList is a descending list of 2's with each element raised to 
--			  the power of the length of the list minus the positional value of 
--			  that element in the list

rightFold f u listA = do
	let help f u listA total = do
		if listA /= []
			then f (head listA) (help f u (tail listA) total)
			else u
	help f u listA 0

main = do
	print(rightFold (-) 5 [1,4,5,3])