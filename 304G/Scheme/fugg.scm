(define (mapper f)
	(lambda (x) (map f x))
)

(define (test x)
	(* x 10)
)

((mapper test) (list 1 2 3))