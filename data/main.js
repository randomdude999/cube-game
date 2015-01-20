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



var dev = true;


var itemCounter = 0;
var timer = 0;
var paused = false;
 
var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});
 
 
var time = Date.now();

var SpriteDispX = 0;
var SpriteDispY = 0;
 
function update(mod) {
    if (37 in keysDown) {
        mySprite.x -= mySprite.speed * mod;
    }
    if (38 in keysDown) {
        mySprite.y -= mySprite.speed * mod;
    }
    if (39 in keysDown) {
        mySprite.x += mySprite.speed * mod;
    }
    if (40 in keysDown) {
        mySprite.y += mySprite.speed * mod;
    }
    
    SpriteDispX = Math.round(mySprite.x);
    SpriteDispY = Math.round(mySprite.y);
    
    if (
        mySprite.x < item.x + item.size &&
        mySprite.x + mySprite.size > item.x &&
        mySprite.y < item.y + item.size &&
        mySprite.y + mySprite.size > item.y
    ) {
    item.x = Math.round(Math.random() * canvas.width),
    item.y = Math.round(Math.random() * canvas.height),
    itemCounter ++;
    itemNotInCanvas();
    }
    
    if (mySprite.x < 0) {
        mySprite.x = 0;
    }
    if (mySprite.y < 0) {
        mySprite.y = 0;
    }
    if (mySprite.x + mySprite.size > canvas.width) {
        mySprite.x = canvas.width - mySprite.size;
    }
    if (mySprite.y + mySprite.size > canvas.height) {
        mySprite.y = canvas.height - mySprite.size;
    }
}

function itemNotInCanvas() {
    if (item.x > canvas.width - item.size || item.y > canvas.height - item.size) {
        item.x = Math.round(Math.random() * canvas.width),
        item.y = Math.round(Math.random() * canvas.height),
        itemNotInCanvas();
    }
}
 
function render() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    ctx.fillStyle = mySprite.color;
    ctx.fillRect(SpriteDispX, SpriteDispY, mySprite.size, mySprite.size);
 
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.size, item.size);
 
    ctx.font = '12pt Arial';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'top';
    ctx.fillText("Score:", 10, 10);
    ctx.fillText("Time:", 10, 32);
    ctx.fillText(itemCounter, 60, 10);
    ctx.fillText(timer, 54, 32);
    if (dev === true) {
        ctx.fillText("Canvas width:", 10, 54);
        ctx.fillText("Canvas height:", 10, 76);
        ctx.fillText("MySprite x:", 10, 98);
        ctx.fillText("MySprite y:", 10, 120);
        ctx.fillText("Item x:", 10, 142);
        ctx.fillText("Item y:", 10, 164);
        ctx.fillText(canvas.width, 114, 54);
        ctx.fillText(canvas.height, 120, 76);
        ctx.fillText(SpriteDispX, 92, 98);
        ctx.fillText(SpriteDispY, 92, 120);
        ctx.fillText(item.x, 59, 142);
        ctx.fillText(item.y, 59, 164);
    }
}
 
function run() {
    if (80 in keysDown) {
        var timeout = setTimeout(function(){
            paused = !paused;
            if (paused === false) {
                timerC = setInterval(function() {timer ++;}, 1000);
            }
        }, 200);
    }
    if (paused === false) {
        update((Date.now() - time) / 1000);
    }
    else {
        clearInterval(timerC);
    }
    render();
    time = Date.now();
}
 
mainLoop = setInterval(run, 10);
itemNotInCanvas();
timerC = setInterval(function() {timer ++;}, 1000);
