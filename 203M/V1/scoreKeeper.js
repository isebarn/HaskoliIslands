/* 
Use:    scoreKeeper()
After:  Scorekeeping object


Functions:
    increaseScore() - increases the number of circles representing the score
    decreaseScore() - decreases the number of circles representing the score
    redraw()        - redraws the scoreCard array
*/

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

    this.redraw = function() {
        for (var i = 0; i < this.scoreCard.length; i++) {
            gl.bufferData(gl.ARRAY_BUFFER, flatten(this.scoreCard[i]), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 27);
        };
    } 
}