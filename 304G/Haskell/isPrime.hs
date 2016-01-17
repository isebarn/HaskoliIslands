-- Usage	: newList = powerList n
-- Before	: n is a positive integer or 0
-- After	: newList is a descending list of 2's with each element raised to 
--			  the power of the length of the list minus the positional value of 
--			  that element in the list

isPrime x = do
	let looper x n = do
		if n > 1 
			then if (mod x n) == 0
				then 0
				else looper x (n-1)
		else x
	looper (floor x) (floor (sqrt x))


primeList x = do
	map isPrime x

primeSort x = do
	let removeZeros oldList newList = do
		if oldList == []
			then newList
		else
			if head oldList == 0
				then removeZeros (tail oldList) newList
			else removeZeros (tail oldList) (newList ++ [(head oldList)])
	removeZeros (map isPrime x) []


main = do
	print(isPrime 982451653)
	print(primeList [1..999])
	print(primeSort [0..999])