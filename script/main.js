///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var player; 
var level = [];

function Rectangle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
}

function Entity(x, y, width, height, color) {
    Rectangle.call(this, x, y, width, height, color);
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.score = 0;
    //this.status = 0;
    this.gForce = 10;

    this.entityUpdate = function entityUpdate() {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.updatePos = function updatePos() {
        this.y += this.yVelocity + this.gForce;
        this.x += this.xVelocity;
    }

    this.moveRight = () => {
        this.xVelocity = 10;
    }

    this.moveLeft = () => {
        this.xVelocity = -10;
    }

    this.jump = () => {
        this.yVelocity = -20;
    }
    return this;
}

// ---------- Movement Handler ----------

document.onkeydown = document.body.onkeydown = (e) => {
	  if(e.keyCode == 68) {
	  	player.moveRight();
	  } else if (e.keyCode == 65){ 
	  	player.moveLeft();
	  }
    }

document.onkeyup = document.body.onkeyup = (e) => {
	  if(e.keyCode == 68 || e.keyCode == 65) {
        player.xVelocity = 0;
      }
      if(e.keyCode == 32){
        player.yVelocity = 0;
      }
    }

document.onkeypress = document.onkeypress = (e) => {
    if(e.keyCode == 32){
        player.jump();
    }
}

// ---------- Game Function ----------

const draw = {
    canvas : function drawCanvas(width, height, color) {
        this.width = width;
        this.height = height;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    map : function drawMap() { // Draw map and keep all platform in array
        let platform1 = new Rectangle(0,0,1200,10, "red");//top
        let platform2 = new Rectangle(0,0,10,750, "red");//left
        let platform3 = new Rectangle(990,0,10,750, "red");//right
        let platform4 = new Rectangle(0,490,1200,10, "red");//bottom
        level = [platform1, platform2, platform3, platform4];
        
    }
}
function collisionDetector(obj) {
    for (let i = 0; i < level.length; i++) {
        if ((obj.y+obj.height) == (490)) {
            obj.gForce = 0;
        }
        else{
            obj.gForce = 10;
        }
    }
}

// ---------- Game Loop ----------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new Entity(500, 100, 50, 80, "#9ce2a0");
    setInterval(game, 33); // 33ms ~ 30fps (defalut = 33ms)
}

function render() {
    draw.canvas(1000, 500, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else

}

function game() { //update here
    collisionDetector(player);
    player.updatePos();
    console.log("player", player.gForce);
    render();
}
