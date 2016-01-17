(define (iLeft f u x)
	(if (null? x)
	u
	(iLeft f (f (car x) u) (cdr x))
	)
)

(iLeft + 5 (list 1 2 3))

(define (iRight f u x)
	(if (null? x)
	u
	(f (car x) (iRight f u (cdr x)))
	)
)

(iRight + 5 (list 1 2 3))

; Gott að muna:
; Left hefur iLeft lengst til vinstri (lína 4)
; Right hefur iRight lenst til hægri (lína 13)