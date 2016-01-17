; Klárað: Já
(define (fibonacci)
	(define (streamer m1 m2)
	  (cons-stream m2 (streamer m2 (+ m1 m2)))
	)	
  (streamer 0 1)
)

; Straumaprentari
(define (streamPrint stream m)
  	(define (help stream m n)
    	(if (= m 0)
    	n
    	(help (stream-cdr stream) (- m 1) (cons (stream-car stream) n))
		)
	)
	(help stream m (list ))
)

; Til að sýna að þetta virkar
(streamPrint (fibonacci) 5)
