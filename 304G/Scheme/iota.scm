(define (iota n)
	(define (help n newList)
		(if (= n 0)
		newList
		(help (- n 1) (cons n newList)))
	)
	(help n (list ))
)

(iota 5)