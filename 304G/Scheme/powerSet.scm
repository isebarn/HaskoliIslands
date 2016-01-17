(define (powerList x)
	(if (null? x)
	(list (list ))
	(let ((head (car x)) (pList (powerList (cdr x))))
	(append pList (map (lambda (y) (cons head y)) pList))))
)

(powerList (list 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 ))
