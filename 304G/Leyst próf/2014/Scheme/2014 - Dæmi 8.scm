(define (maxList lyst)
	(define (maxVal a b)
		(if (< a b)
		b
		a)
	)
	(define (helper lyst maxValue)
		(if (null? lyst)
		maxValue
		(helper (cdr lyst) (maxVal (car lyst) maxValue)))
	)
	(helper lyst (car lyst))
)

(define (minListList lyst)
	(define (minVal a b)
		(if (> a b)
		b
		a)
	)
	(define (help lyst minValue)
		(if (null? lyst)
		minValue
		(help (cdr lyst) (minVal (car lyst) minValue)))
	)
	(help (map maxList lyst) (car (map maxList lyst)))
)

(minListList (list (list 1 2 3) (list 9 48 3)))
