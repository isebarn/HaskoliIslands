isPrime listNumber = do
	let helper number brick =
		if number > brick
			then 
				if mod number brick == 0
					then 0
				else helper number (brick + 1)
		else number

	helper listNumber 2

findPrimeList listNumber = do
	map isPrime listNumber


main = do 
	print(findPrimeList [1..50])
