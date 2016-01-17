-- Usage	: newList = powerList n
-- Before	: n is a positive integer or 0
-- After	: newList is a descending list of 2's with each element raised to 
--			  the power of the length of the list minus the positional value of 
--			  that element in the list

import Data.Typeable
bit n = do
	(2^n)

tabasco n m = do
	(n * m)

combiner f x g = do
	(\y -> f (g x) y)


main = do
	print(bit 4)
	print(tabasco 5 (bit 4))
	print((combiner tabasco 4 bit) 5)