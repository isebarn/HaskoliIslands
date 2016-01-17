(define (biApplySum operators listA listB)
	(define (helper operators listA listB totalSum)
		(if (null? operators)
		totalSum
		(helper (cdr operators) (cdr listA) (cdr listB) (+ totalSum ((car operators) (car listA) (car listB)))))
	)
	(helper operators listA listB 0)
)

(biApplySum (list + - / ) (list 8 12 20 ) (list 2 2 2 ))