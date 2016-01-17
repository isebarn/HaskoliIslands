(define (isPrime x)
	(define (looper x n)
		(if (> n 1)
			(if (= (modulo x n) 0)
			0
			(looper x (- n 1)))
		x)
	)
	(looper x (floor->exact (sqrt x)) )
)

(define (primeList x)
	(map isPrime x)
)

(define (primeSort x)
	(define (sweepZeros oldList newList)
		(if (null? oldList)
			newList
			(if (= 0 (car oldList))
				(sweepZeros (cdr oldList) newList)
				(sweepZeros (cdr oldList) (append newList (list (car oldList)) ))))
	)
	(sweepZeros (map isPrime x) (list ))
)


(isPrime 533000389)

(primeList (list 1 2 3 4 5 6 7 8 9))

(primeSort (list 1 2 3 4 5 6 7 8 9))
