;; Usage	: x = cubesum listNum
;; Pre		: listNum is a list of numbers
;; Post		: x is the sum of all elements of the list raised to the 3rd reich

(define (fulle x)
	(* 10 x)
)

(define (grosse x)
	(* 5 x)
)

(define (fCompose f g)
	(lambda (x) (f (g x)))
)

((fCompose fulle grosse) 5)
