---Fyrra einstaklingsverkefni
listmaker n m = [n..m]
square x = x * x
listAll f n m = (map f ([n..m]))

---Fyrra hopverkefni
reverseList x = foldl (\x y -> y:x) [] x
y = [[1,2,3],[10,9,8],[5,5,5]]


---Seinna hopverkefni lausn 1
multiplicity x = (foldl (*) 1 x)
multiplicityList x = (map multiplicity x)
summer x = foldl (+) 0 x
snorriSTFU x = (summer (multiplicityList x))

---Seinna hopverkefni lausn 2
summy p = 
	summerTime where 
		summerTime = foldl (+) 0 multiplyAllLists
			where
				multiplyAllLists = (map multiplySingleList p)
					where multiplySingleList p = (foldl (*) 1 p) 


main = do 
	---Test fyrir fyrra einstaklingsverkefni
	print (listmaker 5 10) 
	print (square 5) 
	print (listAll square 1 10)
	print (listAll (\x -> x*x)  1 10)

	---Test fyrir fyrra hopverkefni
	print (reverseList (listmaker 1 10))


	---Test fyrir seinna hopverkefni lausn 1
	print (summer (listmaker 1 10))
	print (multiplicity [1,2,3])
	print (multiplicityList y)
	print (snorriSTFU y)

	---Test fyrir seinna hopverkefni lausn 2
	print (summy y)
