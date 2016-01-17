(define (maker)
	(define (helper val1 val2)
		(cons-stream val2 (helper val2 (+ val1 val2)))
	)
	(helper 0 1)
)

(stream-car (stream-cdr (stream-cdr (maker))))
