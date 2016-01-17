Klárað: Já

(define (listmaker n)
	(define (helper i m)
		(if (= n i)
		(cons i m)
		(helper (+ i 1) (cons i m)))
	)
	(helper 0 (list ))
)

(listmaker 5)