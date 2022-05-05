class Planet {
    constructor(x, y, velocityX, velocityY, mass, movable) {
        this.position = new Vector(x,y)
        this.velocity = new Vector(velocityX,velocityY)
        this.mass = mass
        this.radius = Math.log2(mass+1)*2
        this.color = 'rgb(' + Math.random()*256 +', ' + Math.random()*256+', ' + Math.random()*256 + ')'
        this.movable = movable
    }

    changeVelocity(velocityX, velocityY) {
        this.velocity = Vector.add(this.velocity,new Vector(velocityX,velocityY))
    }

    draw() {
        if (this.movable) {
            this.position = Vector.add(this.position,this.velocity)
        }
        var c = canvas.getContext('2d');
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.closePath
    }

    borderColision(width,height) {
        if (this.position.x <= this.radius && this.velocity.x < 0) {
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y <= this.radius && this.velocity.y < 0) {
            this.velocity.y = -this.velocity.y
        }
        if (this.position.x >= width-this.radius && this.velocity.x > 0) {
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y >= height-this.radius && this.velocity.y > 0) {
            this.velocity.y = -this.velocity.y
        }

    }
}