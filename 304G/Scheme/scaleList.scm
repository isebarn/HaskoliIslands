;; Usage	: newList = scaleList oldlist scale
;; Pre		: oldList is a list, scale is an integer
;; Post		: newList is oldList with every element multiplied by scale

(define (scaleList oldList scale)

	;; Usage	: newList = reverseList oldlist newlist
	;; Pre		: oldList is a list, newList is an empty list
	;; Post		: newList is oldList reversed
	(define (reverseList oldList newList)
		(if (null? oldList)
		newList
		(reverseList (cdr oldList) (cons (car oldList) newList))))

	;; Usage	: newList = resize oldList scale newList
	;; Pre		: oldList is a list, scale is a scaler, newlist is an empty list
	;; Post		: newList is oldList reversed, with every element multiplied by scale
	(define (resize oldList scale newList)
		(if (null? oldList)
		newList
		(resize (cdr oldList) scale (cons (* scale (car oldList)) newList)))
	)
	(reverseList (resize oldList scale (list )) (list ))
)

(scaleList (list 1 2 3) 5)