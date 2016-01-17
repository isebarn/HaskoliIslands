;; Usage	: x = cubesum listNum
;; Pre		: listNum is a list of numbers
;; Post		: x is the sum of all elements of the list raised to the 3rd reich
(define (cubesum listNum)
	(define (help listNum total)
		(if (null? listNum)
		total
		(help (cdr listNum) (+ total (* (car listNum) (car listNum) (car listNum)))))
	)
	(help listNum 0)
)

(cubesum (list 1 2 3))