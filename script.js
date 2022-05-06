var canvas = document.querySelector('canvas');
var div = document.getElementById('window');
var internalDiv = document.getElementById('hud');
var divCanvas = document.getElementById('canvas');
var slider = document.getElementById("myRange");

canvas.style.marginTop = (div.clientHeight/5.058) + 'px';
canvas.width = (div.clientWidth/2.11);
canvas.height = (div.clientHeight/1.60);
internalDiv.style.width = (div.clientWidth/1.9) + 'px';
internalDiv.style.height = (div.clientHeight/1.60 + 'px');

var planetList = new Array();
var staticPlanetList = new Array();
var c = canvas.getContext('2d');
var mouseHoldTimeout;
var mouseDownDone = false;
var staticPlanet = false;

canvas.addEventListener('click', function(event) {
    staticPlanetCheck()
    if (mouseHoldTimeout) {
        clearTimeout(mouseHoldTimeout);
        mouseHoldTimeout = null;
      }
      if (mouseDownDone) {
        mouseDownDone = false;
        return;
      }
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    createPlanet(x,y,slider.value,!staticPlanet)
}, false);

var startPoint = new Vector(0,0);
var endPoint = new Vector(0,0);
var buildLine;

canvas.addEventListener('mousedown', function(event) {   
    mouseHoldTimeout = setTimeout(() => {
        mouseDownDone = true;
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        startPoint = new Vector(x,y)
        endPoint = new Vector(x,y)
        createPlanet(x,y,slider.value,false)
        buildLine = true;
    }, 100);
}, false);

canvas.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    endPoint = new Vector(x,y)
}, false);

canvas.addEventListener('mouseup', function(event) {
    staticPlanetCheck()
    if (buildLine) {
        var distanceX = endPoint.x-startPoint.x
        var distanceY = endPoint.y-startPoint.y
        var velocityX = distanceX/50
        var velocityY = distanceY/50
        startPoint = new Vector(0,0)
        endPoint = new Vector(0,0)
        planetList[planetList.length-1].movable = !staticPlanet;
        planetList[planetList.length-1].changeVelocity(velocityX,velocityY)
        buildLine = false;
    }
}, false);
    
function staticPlanetCheck() {
    if (document.getElementById("static").checked) {
        staticPlanet = true;
    } else {
        staticPlanet = false;
    }
}

function createPlanet(x,y,mass,movable) {
    var planet = new Planet(x,y,0,0,mass,movable)
    planetList.push(planet)
    
    if (staticPlanet) {
        staticPlanetList.push(planet)
    }
}

function gravity(planet) {
    staticPlanetList.forEach(staticPlanet => {
        if (planet.movable === true) {
        planet.ballCollision(staticPlanet)
        var mass1 = planet.mass
        var mass2 = staticPlanet.mass
        var g = 6.67408 * Math.pow(-10,-1)

        var dirForce = (Vector.substract(planet.position,staticPlanet.position))
        dirForce = Vector.normalize(dirForce)

        var force = ((mass1*mass2*10)/Math.pow(Vector.distance(planet.position,staticPlanet.position),2))*g
        var accelerationX = (Vector.multiply(dirForce,force).x)/mass1
        var accelerationY = (Vector.multiply(dirForce,force).y)/mass1

        planet.changeVelocity(accelerationX,accelerationY)

        }
    })
}

function draw() {
    c.clearRect(0,0,canvas.width,canvas.height)
    planetList.forEach(planet => {
        gravity(planet)
        var wallCollision = document.getElementById("wall").checked;
        planet.borderCollision(canvas.width, canvas.height, wallCollision)
        planet.draw()
    });
}

function drawLine() {
    if (buildLine) {
        var x1,x2,y1,y2
        x1 = startPoint.x;
        y1 = startPoint.y;
        x2 = endPoint.x;
        y2 = endPoint.y;

        c.beginPath();
        c.moveTo(x1,y1);
        c.lineTo(x2,y2);
        c.strokeStyle = "rgb(20, 152, 222)"
        c.stroke();
    }
}

var output = document.getElementById("output");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

setInterval(draw, 10)
setInterval(drawLine, 10)