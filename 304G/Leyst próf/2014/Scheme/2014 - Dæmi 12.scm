(define (increment x)
  (+ x 1))

(define (double x)
  (* 2 x))

(define (summer x y)
  (+ x y))

(define (combiner f g)
  (lambda (x) (f (g x))))


(define (s f x g)
  (lambda (y) (f x (g y))))

(define test (s summer 5 increment))

(test 4)