Klárað: Já

(define (maxList listi)
	(define (bigger a b)
		(if (< a b)
		b 
		a))
  	(define (helper listi n)
    	(if (null? listi)
    	n
		(helper (cdr listi) (bigger (car listi) n)))
	)
  	(helper listi (car listi))
)

(maxList (list 0 0.4 0.2 0.6 0.5))

(define (minList listi)
	(define (smaller a b)
		(if (> a b)
		b 
		a))
  	(define (helper listi n)
    	(if (null? listi)
    	n
		(helper (cdr listi) (smaller (car listi) n)))
	)
  	(helper (map maxList listi) (car (map maxList listi)))
)

(minList (list (list 1 2 3) (list 9 3 2)))
