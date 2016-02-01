function coins() {
    this.coinArray = []
    var place = 0;
    this.timer = 0


    this.createCoin = function() {
        place = getRandomInRange(1, platforms.length)
        this.coinArray.push(new coin([platforms[place].position.x , platforms[place].position.y + 0.06], 0.05))
    }
    

    this.createCoin()
    this.createCoin()

    this.age = function(){
        this.timer += 1
        if (this.timer >= 100) {
            this.timer = 0
            if (jack.coins < 14) {
                this.createCoin()
            };
        };
                
        for (var i = 0; i < this.coinArray.length; i++) {
            this.coinArray[i].ager()
            if (this.coinArray[i].age >= 200) {
                this.coinArray.splice(i,1)
            };
        };
    }
}

function coin(position,radius) {
    this.circle = createCirclePoints(position,radius,27);
    this.position = new Object();
    this.position.x = position[0]
    this.position.y = position[1]
    this.age = 0
    this.width = radius
    this.height = radius



    this.contact = function(object,i) {
        if (clampX(object, this)) {
            if (locationDifferenceY(object,this,0.1)) {
                coins.coinArray.splice(i,1)
                object.coins += 1
                score.increaseScore()
            };
        };
    }

    this.ager = function() {
        this.age += 1

    }
}

