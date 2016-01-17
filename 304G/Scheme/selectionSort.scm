(define (selectionSort x)

	(define (minimum x)
		(define (looper x smallest)
			(if (null? x)
				smallest
				(if (< (car x) smallest)
				(looper (cdr x) (car x))
				(looper (cdr x) smallest)))
		)
	(looper (cdr x) (car x))
	)

	(define (remMinVal x)
		(define (remover oldList newList valueToRemove)
			(if (= (car oldList) valueToRemove)
			(append newList(cdr oldList))
			(remover (cdr oldList) (append (list (car oldList)) newList) valueToRemove))
		)
		(remover x (list ) (minimum x))
	)

	(define (builder oldList newList)
		(if (null? oldList)
			newList
			(builder (remMinVal oldList) (append newList(list (minimum oldList)) )))
	)
	(builder x (list ))
)

(selectionSort (list  5 2 1 9 8 88 173 1 2 819 27 24 2 5))
