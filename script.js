var canvas = document.querySelector('canvas');

var div = document.getElementById('canvas');

canvas.style.marginTop = (div.clientHeight/5.058) + 'px';
canvas.width = (div.clientWidth/2.11);
canvas.height = (div.clientHeight/1.60);

var c = canvas. getContext('2d');
// x.max = 600 y.max = 235
console.log(canvas);