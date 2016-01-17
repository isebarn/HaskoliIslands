-- Usage	: newList = powerList n
-- Before	: n is a positive integer or 0
-- After	: newList is a descending list of 2's with each element raised to 
--			  the power of the length of the list minus the positional value of 
--			  that element in the list

leftFold f u listA = do
	if listA /= []
		then leftFold f (f u (head listA)) (tail listA)
		else u



main = do
	print(leftFold (-) 5 [1,4,5,3])