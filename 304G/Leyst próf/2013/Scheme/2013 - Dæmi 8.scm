;Klárað: Já? dunno er ekki viss hvað einundarfall er
(define (increase m)
  (+ m 1)
)

(define (summer m n)
  (+ m n))

(define (s f x g)
	(lambda (y) (f (g x) y))
)

((s summer 5 increase) 2)
