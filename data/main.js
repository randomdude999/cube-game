var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

var bgcolor = '#000';

var saveExists = false;

var font12px = '12pt Courier New';
var font36px = '36pt Courier New';

var input = '#';

var buff2Tim = 0;
var buff3Tim = 0;

var pwrupLim = Math.round(Math.random() * 5000);
var pwrupTim = 0;

var mySprite = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 50,
    speed: 350
};

var powerItem = {
    x: Math.round(Math.random() * canvas.width),
    y: Math.round(Math.random() * canvas.height),
    size: 10,
    hidden: true
};

var item = {
    x: Math.round(Math.random() * canvas.width),
    y: Math.round(Math.random() * canvas.height),
    size: 10
};

var colors = {
    mySprite: '#0ff',
    item: '#f00',
    powerItem: '#ff0',
    canvas: '#000',
    text: '#fff'
};

var doubleScore = false;
var d1ev = false;
function dev() {
    d1ev = !d1ev;
    if(d1ev === true) {return "Developer mode enabled";}
    else {return "Developer mode disabled";};
};

var powerup = {
    types: [
        {
            //Decrease time
            run: function() {
                var toRemove = Math.round(timer / 15)
                if (toRemove < 20) {toRemove = 20};
                timer -= toRemove;
                if (timer < 0) {timer = 0};
            }
        },
        {
            //+20 size
            run: function() {
                mySprite.size += 20;
            }
        },
        {
            //double score
            run: function() {
                doubleScore = true;
                buff2Tim = 2000;
            }
        },
        {
            //speed
            run: function() {
                mySprite.speed = 500;
                buff3Tim = 2000;
            }
        },
        {
            //+ score
            run: function() {
                var toAdd = Math.round(itemCounter / 10);
                if (toAdd < 20) {toAdd = 20}
                itemCounter += toAdd;
            }
        }
    ],
    create: function() {
        var n = Math.round(Math.random() * 4);
        powerup.types[n].run();
    }
}

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
            if (menu.sel >= 4) {menu.sel = 3};
            ctx.fillText("MENU", 10, 10);
            menu.hl(0);
            ctx.fillText("Resume", 10, 56);
            menu.hl(1);
            ctx.fillText("Change colors", 10, 102);
            menu.hl(2);
            ctx.fillText("Save", 10, 148);
            menu.hl(3);
            ctx.fillText("Load save", 10, 194);
        }
        else if (menu.loc === 1) {
            if (menu.sel >= 6) {menu.sel = 5};
            ctx.fillText("COLORS", 10, 10);
            menu.hl(0);
            ctx.fillText("Your cube", 10, 56);
            menu.hl(1);
            ctx.fillText("Collectable", 10, 102);
            menu.hl(2);
            ctx.fillText("Canvas", 10, 148);
            menu.hl(3);
            ctx.fillText("Powerup", 10, 194);
            menu.hl(4);
            ctx.fillText("Text", 10, 240);
            menu.hl(5);
            ctx.fillText("Back", 10, 286);
        }
        else if (menu.loc === 2) {
            ctx.fillText("YOUR CUBE", 10, 10);
            ctx.fillText(input, 10, 56);
        }
        else if (menu.loc === 3) {
            ctx.fillText("COLLECTABLE", 10, 10);
            ctx.fillText(input, 10, 56);
        }
        else if (menu.loc === 4) {
            ctx.fillText("CANVAS", 10, 10);
            ctx.fillText(input, 10, 56);
        }
        else if (menu.loc === 5) {
            ctx.fillText("POWERUP", 10, 10);
            ctx.fillText(input, 10, 56);
        }
        else if (menu.loc === 6) {
            ctx.fillText("TEXT", 10, 10);
            ctx.fillText(input, 10, 56);
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
            if (menu.sel === 1) {setTimeout(function() {menu.loc = 1}, 50);};
            if (menu.sel === 2) {setTimeout(save, 50);};
            if (menu.sel === 3) {setTimeout(loadSave, 50);};
        };
        if (menu.loc === 1) {
            if (menu.sel === 0) {setTimeout(function() {menu.loc = 2}, 50);}; 
            if (menu.sel === 1) {setTimeout(function() {menu.loc = 3}, 50);};
            if (menu.sel === 2) {setTimeout(function() {menu.loc = 4}, 50);};
            if (menu.sel === 3) {setTimeout(function() {menu.loc = 5}, 50);};
            if (menu.sel === 4) {setTimeout(function() {menu.loc = 6}, 50);};
            if (menu.sel === 5) {setTimeout(function() {menu.loc = 0}, 50);};
        }
        if (menu.loc === 2) {setTimeout(function() {
            colors.mySprite = input;
            input = '#';
            menu.loc = 1;
        }, 50);};
        if (menu.loc === 3) {setTimeout(function() {
            colors.item = input;
            input = '#';
            menu.loc = 1;
        }, 50);};
        if (menu.loc === 4) {setTimeout(function() {
            colors.canvas = input;
            input = '#';
            menu.loc = 1;
        }, 50);};
        if (menu.loc === 5) {setTimeout(function() {
            colors.powerItem = input;
            input = '#';
            menu.loc = 1;
        }, 50);};
        if (menu.loc === 6) {setTimeout(function() {
            colors.text = input;
            input = '#';
            menu.loc = 1;
        }, 50);};
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
    e.preventDefault();
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

function resizeEvent() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    itemNotInCanvas();
    pwrItemNotInCanvas();
    if (paused === true) {
        paused = false;
        setTimeout(function() {paused = true}, 20)
    }
}

function save() {
    localStorage.mySpriteSize = mySprite.size;
    localStorage.mySpriteX = mySprite.x;
    localStorage.mySpriteY = mySprite.y;
    localStorage.mySpriteSpeed = mySprite.speed;
    localStorage.itemX = item.x;
    localStorage.itemY = item.y;
    localStorage.score = itemCounter;
    localStorage.time = timer;
    localStorage.powerItemX = powerItem.x;
    localStorage.powerItemY = powerItem.y;
    localStorage.powerItemHidden = powerItem.hidden;
    localStorage.powerupTime = pwrupTim;
    localStorage.powerupLimit = pwrupLim;
    localStorage.buff2time = buff2Tim;
    localStorage.buff3time = buff3Tim;
    localStorage.doubleScore = doubleScore;
    localStorage.colorsMySprite = colors.mySprite;
    localStorage.colorsItem = colors.item;
    localStorage.colorsCanvas = colors.canvas;
    localStorage.colorsPowerup = colors.powerItem;
    localStorage.colorsText = colors.text;
    saveExists = true;
};

function loadSave() {
    if (saveExists = true) {
        mySprite.size = Number(localStorage.mySpriteSize);
        mySprite.x = Number(localStorage.mySpriteX);
        mySprite.y = Number(localStorage.mySpriteY);
        mySprite.speed = Number(localStorage.mySpriteSpeed);
        item.x = Number(localStorage.itemX);
        item.y = Number(localStorage.itemY);
        itemCounter = Number(localStorage.score);
        timer = Number(localStorage.time);
        powerItem.x = Number(localStorage.powerItemX);
        powerItem.y = Number(localStorage.powerItemY);
        powerItem.hidden = Number(localStorage.powerItemHidden);
        pwrupTim = Number(localStorage.powerupTime);
        pwrupLim = Number(localStorage.powerupLimit);
        buff2Tim = Number(localStorage.buff2time);
        buff3Tim = Number(localStorage.buff3time);
        doubleScore = localStorage.doubleScore;
        colors.mySprite = localStorage.colorsMySprite;
        colors.item = localStorage.colorsItem;
        colors.canvas = localStorage.colorsCanvas;
        colors.powerItem = localStorage.colorsPowerup;
        colors.text = localStorage.colorsText;
    }
    else {
        menu.sel = 2;
    }
}

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
    if (doubleScore === true) {itemCounter++};
    itemNotInCanvas();
    };
    
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
    
    if (powerItem.hidden === false) {
        if (
            mySprite.x < powerItem.x + powerItem.size &&
            mySprite.x + mySprite.size > powerItem.x &&
            mySprite.y < powerItem.y + powerItem.size &&
            mySprite.y + mySprite.size > powerItem.y
        ) {
            powerup.create()
            powerItem.hidden = true;
            powerItem.x = Math.round(Math.random() * canvas.width);
            powerItem.y = Math.round(Math.random() * canvas.height);
            pwrItemNotInCanvas();
            pwrupTim = 0;
        }
    };
    pwrupTim++;
    if (pwrupTim >= pwrupLim) {
        powerItem.hidden = false;
        pwrupTim = 0;
        pwrupLim = Math.round(Math.random() * 5000);
    }
    if (buff2Tim > 0) {
        buff2Tim--;
    }
    else {
        doubleScore = false;
    };
    if (buff3Tim > 0) {
        buff3Tim--;
    }
    else {
        mySprite.speed = 350;
    };
};

function itemNotInCanvas() {
    if (item.x > canvas.width - item.size || item.y > canvas.height - item.size) {
        item.x = Math.round(Math.random() * canvas.width);
        item.y = Math.round(Math.random() * canvas.height);
        itemNotInCanvas();
    };
};

function pwrItemNotInCanvas() {
    if (powerItem.x > canvas.width-powerItem.size || powerItem.y > canvas.height - powerItem.size) {
        powerItem.x = Math.round(Math.random() * canvas.width);
        powerItem.y = Math.round(Math.random() * canvas.height);
        pwrItemNotInCanvas();
    }
}

function render() {
    ctx.fillStyle = colors.canvas;
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
    ctx.fillStyle = colors.mySprite;
    ctx.fillRect(SpriteDispX, SpriteDispY, mySprite.size, mySprite.size);
 
    ctx.fillStyle = colors.item;
    ctx.fillRect(item.x, item.y, item.size, item.size);
 
    if (powerItem.hidden === false) {
        ctx.fillStyle = colors.powerItem;
        ctx.fillRect(powerItem.x, powerItem.y, powerItem.size, powerItem.size);
    }
    ctx.font = font12px;
    ctx.fillStyle = colors.text;
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
        ctx.fillText("Powerup will spawn in: " + (pwrupLim - pwrupTim), 10, 208);
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
pwrItemNotInCanvas();
timerC = setInterval(function() {timer ++;}, 1000);

console.log("Type 'dev()' to enable developer mode");
