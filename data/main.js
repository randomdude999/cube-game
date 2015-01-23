var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth - 2;
canvas.height = document.documentElement.clientHeight - 5;


var bgcolor = '#000';

var font12px = '12pt Courier New';
var font36px = '36pt Courier New';

var input = '#';
 

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


 
var d1ev = false;
var dev = function() {
    d1ev = !d1ev;
    if(d1ev === true) {console.log("Developer mode enabled");}
    else {console.log("Developer mode disabled");};
};

var menu = {
    loc: 0,
    sel: 0,
    hl: function(x) {
        if (menu.sel === x) {ctx.fillStyle = '#f00'}
        else {ctx.fillStyle = '#000'};
    },
    draw: function() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = font36px;
        ctx.fillStyle = '#000';
        if (menu.sel <= -1) {menu.sel = 0};
        if (menu.loc === 0) {
            if (menu.sel >= 2) {menu.sel = 1};
            ctx.fillText("MENU", 10, 10);
            menu.hl(0);
            ctx.fillText("Resume", 10, 56);
            menu.hl(1);
            ctx.fillText("Options", 10, 102);
        }
        else if (menu.loc === 1) {
            if (menu.sel >= 4) {menu.sel = 3;};
            ctx.fillText("OPTIONS", 10, 10);
            menu.hl(0);
            ctx.fillText("Your cube", 10, 56);
            menu.hl(1);
            ctx.fillText("Collectable", 10, 102);
            menu.hl(2);
            ctx.fillText("Update canvas", 10, 148);
            menu.hl(3);
            ctx.fillText("Back", 10, 194);
        }
        else if (menu.loc === 2) {
            if (menu.sel >= 4) {menu.sel = 3};
            ctx.fillText("YOUR CUBE", 10, 10);
            menu.hl(0);
            ctx.fillText("Color", 10, 56);
            menu.hl(1);
            ctx.fillText("Size", 10, 102);
            menu.hl(2);
            ctx.fillText("Speed", 10, 148);
            menu.hl(3);
            ctx.fillText("Back", 10, 194);
        }
        else if (menu.loc === 3) {
            if (menu.sel >= 3) {menu.sel = 2};
            ctx.fillText("COLLECTABLE", 10, 10);
            menu.hl(0);
            ctx.fillText("Color", 10, 56);
            menu.hl(1);
            ctx.fillText("Size", 10, 102);
            menu.hl(2);
            ctx.fillText("Back", 10, 148);
        }
        else if (menu.loc === 4) {
            ctx.fillText("YOUR CUBE: COLOR", 10, 10);
            ctx.fillText(input, 10, 56);
        }
        else if (menu.loc === 5) {
            if (menu.sel >= 4) {menu.sel = 3};
            ctx.fillText("YOUR CUBE: SIZE", 10, 10);
            menu.hl(0);
            ctx.fillText("Small", 10, 56);
            menu.hl(1);
            ctx.fillText("Medium", 10, 102);
            menu.hl(2);
            ctx.fillText("Large", 10, 148);
            menu.hl(3);
            ctx.fillText("Back", 10, 194);
        }
        else if (menu.loc === 6) {
            ctx.fillText("YOUR CUBE: SPEED", 10, 10);
            menu.hl(0);
            ctx.fillText("Slow", 10, 56);
            menu.hl(1);
            ctx.fillText("Medium", 10, 102);
            menu.hl(2);
            ctx.fillText("Fast", 10, 148);
            menu.hl(3);
            ctx.fillText("Back", 10, 194);
        }
        else if (menu.loc === 7) {
            ctx.fillText("COLLECTABLE: COLOR", 10, 10);
            ctx.fillText(input, 10, 56);
        }
        else if (menu.loc === 8) {
            if (menu.sel >= 4) {menu.sel = 3};
            ctx.fillText("COLLECTABLE: SIZE", 10, 10);
            menu.hl(0);
            ctx.fillText("Small", 10, 56);
            menu.hl(1);
            ctx.fillText("Medium", 10, 102);
            menu.hl(2);
            ctx.fillText("Large", 10, 148);
            menu.hl(3);
            ctx.fillText("Back", 10, 194);
        }
    },
    selDown: function() {menu.sel++;},
    selUp: function() {menu.sel--;},
    enter: function() {
        if (menu.loc === 0) {
            if (menu.sel === 0) {
                paused = !paused;
                timerC = setInterval(function() {timer ++;}, 1000);
            };
            if (menu.sel = 1) {setTimeout(function() {menu.loc = 1}, 50);};
        };
        if (menu.loc === 1) {
            if (menu.sel === 0) {setTimeout(function() {menu.loc = 2}, 50);}; 
            if (menu.sel === 1) {setTimeout(function() {menu.loc = 3}, 50);};
            if (menu.sel === 2) {setTimeout(function() {
                canvas.width = document.documentElement.clientWidth - 2;
                canvas.height = document.documentElement.clientHeight - 5;
                canvas.width = document.documentElement.clientWidth - 2;
                canvas.height = document.documentElement.clientHeight - 5;
                itemNotInCanvas();
                paused = false;
                setTimeout(function(){
                    paused = true;
                    menu.loc = 1;
                    menu.sel = 2;
                },50);
            }, 50);};
            if (menu.sel === 3) {setTimeout(function() {menu.loc = 0}, 50);};
        }
        if (menu.loc === 2) {
            if (menu.sel === 0) {setTimeout(function() {menu.loc = 4}, 50);};
            if (menu.sel === 1) {setTimeout(function() {menu.loc = 5}, 50);};
            if (menu.sel === 2) {setTimeout(function() {menu.loc = 6}, 50);};
            if (menu.sel === 3) {setTimeout(function() {menu.loc = 1}, 50);};
        }
        if (menu.loc === 3) {
            if (menu.sel === 0) {setTimeout(function() {menu.loc = 7}, 50);};
            if (menu.sel === 1) {setTimeout(function() {menu.loc = 8}, 50);};
            if (menu.sel === 2) {setTimeout(function() {menu.loc = 1}, 50);};
        }
        if (menu.loc === 4) {setTimeout(function() {
            mySprite.color = input;
            input = '#';
            menu.loc = 2;
        }, 50);};
        if (menu.loc === 5) {
            if (menu.sel === 0) {setTimeout(function() {mySprite.size = 25}, 50);};
            if (menu.sel === 1) {setTimeout(function() {mySprite.size = 50}, 50);};
            if (menu.sel === 2) {setTimeout(function() {mySprite.size = 75}, 50);};
            if (menu.sel === 3) {setTimeout(function() {menu.loc = 2}, 50);};
        }
        if (menu.loc === 6) {
            if (menu.sel === 0) {setTimeout(function() {mySprite.speed = 175}, 50);};
            if (menu.sel === 1) {setTimeout(function() {mySprite.speed = 350}, 50);};
            if (menu.sel === 2) {setTimeout(function() {mySprite.speed = 525}, 50);};
            if (menu.sel === 3) {setTimeout(function() {menu.loc = 2}, 50);};
        }
        if (menu.loc === 7) {setTimeout(function() {
            item.color = input;
            input = '#';
            menu.loc = 3;
        }, 50);};
        if (menu.loc === 8) {

            if (menu.sel === 0) {setTimeout(function() {item.size = 5}, 50);};
            if (menu.sel === 1) {setTimeout(function() {item.size = 10}, 50);};
            if (menu.sel === 2) {setTimeout(function() {item.size = 15}, 50);};
            if (menu.sel === 3) {setTimeout(function() {menu.loc = 3}, 50);};
        }
    }
}
 
var itemCounter = 0;
var timer = 0;
var paused = false;
 
var keysDown = {};
window.addEventListener('keydown', function(e) {
    if (e.keyCode === 80) {
        paused = !paused;
        if (paused === false) {
            timerC = setInterval(function() {timer ++;}, 1000);
        }
        menu.loc = 0;
        menu.sel = 0;
    };
    if (e.keyCode === 13) {
        menu.enter();
    };
    if (e.keyCode === 38) {
        menu.selUp();
        keysDown[e.keyCode] = true;
    };
    if (e.keyCode === 40) {
        menu.selDown();
        keysDown[e.keyCode] = true;
    };
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        ie = 0;
        for (i = 48; i < 58; i++) {
            if(e.keyCode === i) {input += ie};
            ie++;
        }
    };
    
    if (e.keyCode >= 65 && e.keyCode <= 70) {
        if (e.keyCode === 65) {input += 'a'};
        if (e.keyCode === 66) {input += 'b'};
        if (e.keyCode === 67) {input += 'c'};
        if (e.keyCode === 68) {input += 'd'};
        if (e.keyCode === 69) {input += 'e'};
        if (e.keyCode === 70) {input += 'f'};
    };
    
    if (e.keyCode === 37) {keysDown[e.keyCode] = true;};
    if (e.keyCode === 39) {keysDown[e.keyCode] = true;};
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});
 
 
var time = Date.now();
 
var SpriteDispX = 0;
var SpriteDispY = 0;

var fps = {
    current: 0,
    last: 0,
    lastUpdated: Date.now(),
    update: function() {
        fps.current ++;
        if (Date.now() - fps.lastUpdated >= 1000) {
            fps.last = fps.current;
            fps.current = 0;
            fps.lastUpdated = Date.now();
        };
    }
};
 
function update(mod) {
    fps.update();
    
    if (37 in keysDown) {
        mySprite.x -= mySprite.speed * mod;
    };
    if (38 in keysDown) {
        mySprite.y -= mySprite.speed * mod;
    };
    if (39 in keysDown) {
        mySprite.x += mySprite.speed * mod;
    };
    if (40 in keysDown) {
        mySprite.y += mySprite.speed * mod;
    };
    
    SpriteDispX = Math.round(mySprite.x);
    SpriteDispY = Math.round(mySprite.y);
    
    if (
        mySprite.x < item.x + item.size &&
        mySprite.x + mySprite.size > item.x &&
        mySprite.y < item.y + item.size &&
        mySprite.y + mySprite.size > item.y
    ) {
    item.x = Math.round(Math.random() * canvas.width);
    item.y = Math.round(Math.random() * canvas.height);
    itemCounter ++;
    itemNotInCanvas();
    }
    
    if (mySprite.x < 0) {
        mySprite.x = 0;
    };
    if (mySprite.y < 0) {
        mySprite.y = 0;
    };
    if (mySprite.x + mySprite.size > canvas.width) {
        mySprite.x = canvas.width - mySprite.size;
    };
    if (mySprite.y + mySprite.size > canvas.height) {
        mySprite.y = canvas.height - mySprite.size;
    };
};
 
function itemNotInCanvas() {
    if (item.x > canvas.width - item.size || item.y > canvas.height - item.size) {
        item.x = Math.round(Math.random() * canvas.width);
        item.y = Math.round(Math.random() * canvas.height);
        itemNotInCanvas();
    };
};
 
function render() {
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    if (SpriteDispX < 0) {
        SpriteDispX = 0;
    };
    if (SpriteDispX > canvas.width - mySprite.size) {
        SpriteDispX = canvas.width - mySprite.size;
    };
    if (SpriteDispY < 0) {
        SpriteDispY = 0;
    };
    if (SpriteDispY > canvas.height - mySprite.size) {
        SpriteDispY = canvas.height - mySprite.size;
    };
    ctx.fillStyle = mySprite.color;
    ctx.fillRect(SpriteDispX, SpriteDispY, mySprite.size, mySprite.size);
 
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.size, item.size);
 
    ctx.font = font12px;
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'top';
    ctx.fillText("Score: " + itemCounter, 10, 10);
    ctx.fillText("Time: " + timer, 10, 32);
    if (d1ev === true) {
        ctx.fillText("Canvas width: " + canvas.width, 10, 54);
        ctx.fillText("Canvas height: " + canvas.height, 10, 76);
        ctx.fillText("MySprite x: " + SpriteDispX, 10, 98);
        ctx.fillText("MySprite y: " + SpriteDispY, 10, 120);
        ctx.fillText("Item x: " + item.x, 10, 142);
        ctx.fillText("Item y: " + item.y, 10, 164);
        ctx.fillText("FPS: " + fps.last, 10, 186);
    };
};

 
function run() {
    if (paused === false) {
        update((Date.now() - time) / 1000);
        render();
    }
    else if (paused === true) {
        clearInterval(timerC);
        menu.draw();
    };
    time = Date.now();
};
 
setInterval(run, 10);
itemNotInCanvas();
timerC = setInterval(function() {timer ++;}, 1000);

console.log("Type 'dev()' to enable developer mode");
