(define (pows n)
	(define (help n newList)
		(if (= n -1)
		newList
		(help (- n 1) (cons (expt 2 n) newList)))
	)
	(help n (list ))
)

(pows 4)