var canvas = document.querySelector('canvas');
var div = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.style.marginTop = (div.clientHeight/5.058) + 'px';
canvas.width = (div.clientWidth/2.11);
canvas.height = (div.clientHeight/1.60);

var planetList = new Array();

createPlanet(50,100,10)
createPlanet(100,200,20)
createPlanet(400,200,50)

function createPlanet(x,y,mass) {
    var planet = new Planet(x,y,0,0,mass)
    planetList.push(planet)
   
}

function draw() {
    c.clearRect(0,0,canvas.width,canvas.height)
    planetList.forEach(planet => {
        planet.draw()
    });
}

setInterval(draw, 10)