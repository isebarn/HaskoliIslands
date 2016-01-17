;; Usage	: x = cubesum listNum
;; Pre		: listNum is a list of numbers
;; Post		: x is the sum of all elements of the list raised to the 3rd reich

(define (fubar f x)
	(lambda (y) (f x y))
)

((fubar + 5) 5)