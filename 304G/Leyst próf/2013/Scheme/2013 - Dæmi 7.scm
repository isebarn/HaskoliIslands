; Klárað: Já

(define (insright f u x)
	(if (null? x)
	u
	(f (car x) (insright f u (cdr x)))
	)
)

(insright + 5 (list 1 2 3))

(define (insleft f u x)
 	(if (null? x)
	u
	(insleft f (f u (car x)) (cdr x))
	)
 )

(insleft + 5 (list 1 2 3))

(insright - 5 (list 1 4 5 3))
(insright + 5 (list 1 4 5 3))
(insleft - 5 (list 1 4 5 3))
(insright + 5 (list 1 4 5 3))