class Planet {
    constructor(x, y, velocityX, velocityY, mass) {
        this.position = new Vector(x,y)
        this.velocity = new Vector(velocityX,velocityY)
        this.mass = mass
        this.radius = Math.log2(mass+1)*5
        this.color = 'rgb(' + Math.random()*256 +', ' + Math.random()*256+', ' + Math.random()*256 + ')'
    }

    changeVelocity(velocityX, velocityY) {
        this.velocity = Vector.add(this.velocity,new Vector(velocityX,velocityY))
    }

    draw() {
        this.position = Vector.add(this.position,this.velocity)

        var c = canvas.getContext('2d');
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.closePath
    }
}