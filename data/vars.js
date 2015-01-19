var canvas = document.getElementById('canvas'); 

var useCustomCanvas = false;
 
var mySprite = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 50,
    speed: 350,
    color: '#0ff'
};
 
var item = {
    x: Math.round(Math.random() * canvas.width),
    y: Math.round(Math.random() * canvas.height),
    size: 10,
    color: '#f00'
};

var dev = false;
