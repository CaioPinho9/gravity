class Vector {
    
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    static add(v1,v2) {
        let res = new Vector(0,0);
        res.x = v1.x + v2.x
        res.y = v1.y + v2.y
        return res
    }

    static substract(v1,v2) {
        let res = new Vector(0,0);
        res.x = v1.x - v2.x
        res.y = v1.y - v2.y
        return res
    }

    static multiply(v,num) {
        let res = new Vector(0,0);
        res.x = v.x * num
        res.y = v.y * num
        return res
    }

    static distance(v1,v2) {
        return Math.sqrt(Math.pow(v2.x-v1.x,2) + Math.pow(v2.y-v1.y,2))
    }

    magnitude() {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }

    static normalize(v) {
        let res = new Vector(0,0)
        let mag = v.magnitude()
        res.x = v.x/mag
        res.y = v.y/mag
        return res
    }
}