(define (fowardlist n)
  (define (help n m)
    (if (= n 1)
    (cons n m)
    (help (- n 1) (cons n m))))
  (help n (list ))
)

(fowardlist 5)

(define (reverselist n)
  (define (helper i m)
    (if (= i n)
    (cons i m)
	(helper (+ i 1) (cons i m))))
  (helper 1 (list ))
)

(reverselist 5)

; tail recursion requires that lines 5 and 15 do the cons within the recursive call
; a NON recursive version would be (cons n (helper (+ n 1) m))
; Note the difference between fowardlist and reverselist, this kind of recursion
; constructs a list by default fowards...that is 1,2...n