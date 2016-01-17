-- Usage	: biApplySum listFun listA listB
-- Before	: listFun is a list of binary functions
--            listA and listB are lists of numbers
--			  All lists are of equal length
-- After	: the sum of each individual binary operator from listFun on the
--    	   	  corresponding positional numbers in listA and listB

biApplySum listFun listA listB = do
	let help listFun listA listB sum = do
		if null listFun
			then sum
			else help (tail listFun) (tail listA) (tail listB) ((head listFun) (head listA) (head listB) + sum)
	if null listFun
		then 0
		else help listFun listA listB 0

main = do 
	print(biApplySum [(+),(*)] [3,4] [1,10])