


pluck oldList value = do
	let builder oldList newList value = do
		if oldList == []
			then newList
		else
			if head oldList == value
				then 
					newList ++ tail oldList
			else builder (tail oldList) (newList ++ [head oldList] ) value
	builder oldList [] value

quickSort x = do
	let built oldList newList = do
		if oldList == []
			then newList
		else 
			built (pluck oldList (minimum oldList)) (newList ++ [(minimum oldList)])
	built x []




main = do
	print(pluck [1..5] 3)
	print(quickSort [1,6,3,7,4,7,90])
