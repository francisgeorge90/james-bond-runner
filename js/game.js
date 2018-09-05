function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.maxRandomY = 550;
  this.minRandomY = 450;

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

      var platformState = true;
      
      if (this.minRandomY <= 400 && platformState == true) {
        platformState = false;
      } else if (platformState == true)
      this.minRandomY -= 25;
    } 

    
    this.moveAll();
    this.draw();
    
    // eliminamos obstáculos fuera del canvas
    this.clearPlatforms();
    
    if (this.isHeliHit()) {
      this.player.playerPoints += 1;
      if(this.player.playerPoints >= 200) {
        this.gameWon();
      }
    }
    
    if (this.isPlayerHit()) {
      this.helicopter.heliPoints += 1;
      if (this.helicopter.heliPoints >= 200) {
        this.gameOver();
      }
    }

    this.isLevel();

  }.bind(this), 1000 / this.fps);
};

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.gameWon = function() {
  this.stop();
  
  if(confirm("PLAYER WON!!! Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.gameOver = function() {
  this.stop();
  
  if(confirm("GAME OVER. The Helicoper won! Play again?")) {
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
};

Game.prototype.isLevel = function() {

  this.platforms.some(function(platform) {

    if(this.player.x + this.player.w > platform.x && 
      platform.x + platform.w > this.player.x && 
      this.player.y + this.player.h > platform.y && 
      platform.y + platform.h > this.player.y ) {

      this.player.vy = 0;
  
      this.player.y = platform.y - this.player.h;
      }
    
}.bind(this));}

Game.prototype.clearPlatforms = function() {
  this.platforms = this.platforms.filter(function(platform) {
    return platform.x >= 0;
  });
};

Game.prototype.generatePlatform = function() {
  this.platforms.push(new Platform(this, this.maxRandomY, this.minRandomY));
};

Game.prototype.isHeliHit = function() {
  return this.player.bullets.some(function(bullet) {
    return (
      (this.helicopter.x + this.helicopter.w > bullet.x && 
        bullet.x > this.helicopter.x && 
        this.helicopter.y + this.helicopter.h > bullet.y && 
        bullet.y > this.helicopter.y )
    );
  }.bind(this));
};

Game.prototype.isPlayerHit = function() {
  return this.helicopter.bullets.some(function(bullet) {
    return (
      (this.player.x + this.player.w > bullet.x && 
        bullet.x > this.player.x && 
        this.player.y + this.player.h > bullet.y && 
        bullet.y > this.player.y )
    );
  }.bind(this));
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
  this.drawHeliPoints(); 
  this.drawPlayerPoints();
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  // this.obstacles.forEach(function(obstacle) { obstacle.move(); });
  this.platforms.forEach(function(platform) { platform.move(); });
};

Game.prototype.drawHeliPoints = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "red";
  this.ctx.fillText("Heli Points: " + this.helicopter.heliPoints + "/200", 900, 50);
}

Game.prototype.drawPlayerPoints = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "green";
  this.ctx.fillText("Player Points: " + this.player.playerPoints + "/200", 50, 50);
}