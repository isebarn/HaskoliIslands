function scoreKeeper() {
    this.scoreCard = []

    this.position = new Object()
    this.position.x = -0.85
    this.position.y = -0.92

    this.increaseScore = function() {
        this.scoreCard.push(createCirclePoints([this.position.x,this.position.y],0.05,27))
        this.position.x += 0.15
    }
    this.decreseScore = function() {
        this.scoreCard.pop()
        this.position.x -= 0.15
    }    


}