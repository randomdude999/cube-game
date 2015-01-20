var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth - 2;
canvas.height = document.documentElement.clientHeight - 5;


 

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
