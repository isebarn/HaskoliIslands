-- Usage	: createList begin end
-- Before	: begin and end are positive integers
-- After	: Ascending list from begin to end

createList begin end = do
	if begin > end
		then []
		else if begin < end
			then begin : createList (begin + 1) end
			else [end]



main = do 
	print(createList 0 100)