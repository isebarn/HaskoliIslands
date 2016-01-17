; Klárað: Já


; Frá vinstri til hægri
(define (foldll f u x)
	(if (null? x)
	u
	(foldll f (f u (car x)) (cdr x)))
)

(foldll + 5 (list -1 -2 -3 -4))


; Frá hægri til vinstri
(define (foldrr f u x)
	(if (null? x)
	u
	(f (car x) (foldrr f u (cdr x))))
)

(foldrr + 5 (list -1 -2 -3 -4))

