;; uffffffff vonandi er þetta in place hjá mér... as it should be

(define (toFront x n)
	(define (caller oldList newList place)
		(if (= place 1)
			(cons (car oldList) (append newList (cdr oldList)))
			(caller (cdr oldList) (append newList (list (car oldList))) (- place 1)))
	)
	(caller x (list ) n)
)

(define (sortTop x n)
	(define (pusher oldList newList n value)
		(if (= n 1)
			(append newList (cons value oldList))
			(if (< value (car oldList))
				(append newList (cons value oldList))
				(pusher (cdr oldList) (append newList (list (car oldList))) (- n 1) value)))
	)
	(pusher (cdr x) (list ) n (car x))
)

(define (insertionSort x)
	(define (sorter x n)
		(if (= n (+ 1 (length x)))
			x
			(sorter (sortTop (toFront x n) n) (+ n 1)))
	)
	(sorter x 1)
)

(insertionSort (list 6 3 4 9 2 8 1))

