(define oddity (cons-stream 1 (stream-map (lambda (x) (+ 2 x)) oddity)))

(define (oddStream)
  (define (helper n)
    (cons-stream n (helper (+ n 2))))
  (helper 1)
)

(stream-car (stream-cdr (oddStream)))
(stream-car (stream-cdr oddity))