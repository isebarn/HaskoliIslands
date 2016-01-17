-- Usage	: createRevList end begin
-- Before	: end and begin are positive integers 
-- After	: An descending list from the end to the begining

createRevList end begin = do
	if end < begin
		then []
		else if end > begin
			then end  : createRevList (end - 1) begin
			else [end]

main = do
	print(createRevList 10 4)