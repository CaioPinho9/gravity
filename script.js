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

canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    createPlanet(x,y,slider.value)
}, false);
    

function createPlanet(x,y,mass) {
    var planet = new Planet(x,y,0,0,mass)
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

var output = document.getElementById("output");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

setInterval(draw, 10)