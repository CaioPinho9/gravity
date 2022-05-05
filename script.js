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
var c = canvas.getContext('2d');
var mouseHoldTimeout;
var mouseDownDone = false;

canvas.addEventListener('click', function(event) {
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
    createPlanet(x,y,slider.value,true)
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
    if (buildLine) {
        var distanceX = endPoint.x-startPoint.x
        var distanceY = endPoint.y-startPoint.y
        var velocityX = distanceX/50
        var velocityY = distanceY/50
        startPoint = new Vector(0,0)
        endPoint = new Vector(0,0)
        planetList[planetList.length-1].changeVelocity(velocityX,velocityY)
        planetList[planetList.length-1].movable = true;
        buildLine = false;
    }
}, false);
    

function createPlanet(x,y,mass,movable) {
    var planet = new Planet(x,y,0,0,mass,movable)
    planetList.push(planet)
}

function moveRandom(planet) {
    var signal = Math.floor(Math.random()*2+1)
    if (signal == 2) {
        signal = 1
    } else {
        signal = -1
    }
    planet.changeVelocity(Math.random()*signal/5, Math.random()*signal/5)
}

function draw() {
    c.clearRect(0,0,canvas.width,canvas.height)
    planetList.forEach(planet => {
        planet.borderColision(canvas.width, canvas.height)
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