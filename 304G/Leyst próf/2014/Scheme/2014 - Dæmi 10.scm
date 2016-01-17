(define (revList n) 
	(define (help rev m)
		(if (= n (- m 1))
		rev
		(help (cons m rev) (+ m 1)))
	)
	(help (list ) 1)
)

(revList 5)