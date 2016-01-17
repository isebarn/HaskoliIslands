; 	Fyrra fallið er ekki halaendurkvæmt
;	Seinna fallið er halaendurkvæmt
;	Munurinn er að í fyrra fallinu þá skeyti ég saman
;	tölu og kalli á fall
; 	en í seinna fallinu þá kalla ég á fallið fyrir hvert einasta
;	stak sem mun koma í listann, og set síðan saman allt þegar öll gildin eru
;	tilbúin
;	...or something


(define (revPowerList n)
	(if (= 0 n)
	(list (expt 2 n))
	(cons (expt 2 n) (revPowerList (- n 1)))
	)
)

(revpowerlist 5)

(define (revPowerList n)
	(define (help n m rail)
	  	(if (= n m)
	  	(cons (expt 2 n) rail)
	  	(help n (+ m 1) (cons (expt 2 m) rail))
		)
	)
	(help n 0 (list ))
)
(revPowerList 5)

