(define (iota n)
	(define (builder newList n)
		(if (= n 0)
		newList
		(builder (cons n newList) (- n 1)))
	)
	(builder (list ) n)
)

(define (atoi n)
	(define (builder newList m)
		(if (= m n)
		(cons m newList)
		(builder (cons m newList) (+ m 1)))
	)
	(builder (list ) 1)
)

(define (insertRight f u x)
	(if (null? x)
	u
	(f (car x) (insertRight f u (cdr x))))
)

(define (insertLeft f u x)
	(if (null? x)
	u
	(insertLeft f (f u (car x)) (cdr x)))
)

(define (powerSet x)
	(if (null? x)
		(list (list ))
	(let 
		((head (car x)) (tail (powerSet (cdr x))))
		(append tail (map (lambda (y) (cons head y)) tail))))
)

(define (merger f x g)
	(lambda (y) (f x (g y)))
)

(define (pump x)
	(* x 10)
)

(define (maxList x)
	(define (bigger n m)
		(if (> n m)
			n
			m)
	)

	(define (findBiggest x value)
		(if (null? x)
			value
			(findBiggest (cdr x) (bigger (car x) value)))
	)

	(if (null? x)
		0
		(findBiggest (cdr x) (car x)))
)

(define (minList x)
	(define (smaller n m)
		(if (< n m)
			n
			m)
	)

	(define (findSmallest x value)
		(if (null? x)
			value
			(findSmallest (cdr x) (smaller (car x) value)))
	)

	(if (null? x)
		0
		(findSmallest (cdr x) (car x)))
)

(define (minMax x)
	(minList (map maxList x))
)

(define (mop x)
	(if (null? (cdr x))
		(car x)
		(mop (cons (max (car x) (car (cdr x))) (cdr (cdr x)))))
)

(define (minymaxy x)
	(define (find f x)
		(if (null? (cdr x))
		(car x)
		(find f (cons (f (car x) (cadr x)) (cddr x))))
	)
	(if (null? x)
		0
		(find min (map (lambda (y) (find max y)) x)))
)


(iota 5)
(atoi 5)
(insertRight - 5 (list 1 4 5 3))
(insertLeft - 5 (list 1 4 5 3))
(powerSet (list 1 2 3))
((merger + 5 pump) 10)
(maxList (list 1 9 18 1 83  1 8 12 39))
(mop (list 4 1 8 3))
(minymaxy (list (list 1 2 3) (list 4 5 6)))
(minMax (list (list 6 3 9 2 81) (list 6 4 2)))
(minymaxy (list (list 6 3 9 2 81) (list 6 4 2)))