function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;


  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();

    this.framesCounter++;

    // controlamos que frameCounter no sea superior a 1000
    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    // controlamos la velocidad de generación de obstáculos
    if (this.framesCounter % 120 === 0) {
      this.generatePlatform();
    } 

    this.score += 0.01;
    
    this.moveAll();
    this.draw();

    // eliminamos obstáculos fuera del canvas
    this.clearPlatforms();

    // if (this.isCollision()) {
    //   this.gameOver();
    // }
    this.isLevel();

  }.bind(this), 1000 / this.fps);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.gameOver = function() {
  this.stop();
  
  if(confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.helicopter = new Helicopter(this);
  this.framesCounter = 0;
  this.platforms = [];
  this.score = 0;
};

Game.prototype.isLevel = function() {

  this.platforms.some(function(platform) {

    if ((this.player.x + this.player.w) >= platform.x && 
    (this.player.x + this.player.w) < (platform.x + platform.w) &&
    (this.player.y + this.player.h - 10) < platform.y) {
      this.player.y = platform.y - this.player.h;
      console.log("on the bar")
      }
    
}.bind(this));}

Game.prototype.clearPlatforms = function() {
  this.platforms = this.platforms.filter(function(platform) {
    return platform.x >= 0;
  });
};

Game.prototype.generatePlatform = function() {
  this.platforms.push(new Platform(this));
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.helicopter.draw();
  // this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.platforms.forEach(function(platform) { platform.draw(); });
  this.drawScore();  
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  // this.obstacles.forEach(function(obstacle) { obstacle.move(); });
  this.platforms.forEach(function(platform) { platform.move(); });
};

Game.prototype.drawScore = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "green";
  this.ctx.fillText(Math.floor(this.score), 50, 50);
}