-- Usage	: x = maxValue list
-- Before	: list is a list of integers
-- After	: x is the largest value inside the list list

maxValue [] = 0
maxValue list = do
	let help list maxVal = do
		if null list
			then maxVal
			else if (head list) < maxVal
				then help (tail list) maxVal
				else help (tail list) (head list)
	help list (head list)

-- Usage	: x = minValue list
-- Before	: list is a list of lists
-- After	: maximum values of individual lists constructed to a list. x is the smallest value
--			  in that list

minValue [] = 0
minValue list = do
	let help list minVal = do
		if null list
			then minVal
			else if (head list) > minVal
				then help (tail list) minVal
				else help (tail list) (head list)

	help (map maxValue list) (head (map maxValue list))

main = do 
	print(maxValue [1,6,3,8,5])
	print(maxValue [])
	print(minValue [[1,9,4,6,2,7], [5,2,6,4,7,2,11,5,222,6]])
	print(minValue [])
