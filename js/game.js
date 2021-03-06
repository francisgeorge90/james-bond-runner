function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.fps = 60;

  //HELI KEYS
  this.W_KEY = 87;
  this.D_KEY = 68;
  this.A_KEY = 65;
  this.S_KEY = 83;
  this.E_KEY = 69;
  
  //PLAYER KEYS
  this.TOP_KEY = 38;
  this.RIGHT_KEY = 39;
  this.LEFT_KEY = 37;
  this.SPACE = 32;
  this.MOONWALK = 77;
  this.MONKEYD = 76;
  this.DANCING = 75;
  this.SHIFT = 16;
  this.wPressed = false;
  this.dPressed = false;
  this.aPressed = false;
  this.sPressed = false;
  this.ePressed = false;
  this.topPressed = false;
  this.rightPressed = false;
  this.leftPressed = false;
  this.spacePressed = false;
  this.moonwalk = false;
  this.dancing = false;
  this.monkeyDown = false;
  this.hanging = false;

  this.reset();
}


      // ======================================================
      // INTERVAL TIMER - INCLUDES ALL CONDITIONALS EVERY FRAME AND START

Game.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.clear();
      console.log(this.player.vy)
      this.framesCounter++;

      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 200 === 0) {
        this.generatePlatform();
      }

      this.moveAll();
      this.draw();
      this.clearPlatforms();

      // HELICOPTER HIT AND POINTS

      if (this.helicopter.isHeliHit()) {
        if (this.player.y > 300) {
          this.player.playerPoints += 1;
        } else if (this.player.y < 550) {
          this.player.playerPoints += 2;
        }
        if(this.player.playerPoints >= 190) {
          this.helicopter.img.src = "img/helicopter_crash.png";
          this.helicopter.img.frames = 3;
        }
        if (this.player.playerPoints >= 200) {
          this.gameWon()
        }
      }

      // PLAYER HIT AND POINTS

      if (this.player.isPlayerHit()) {
        this.helicopter.heliPoints += 1;
        if (this.helicopter.heliPoints >= 200) {
          this.gameOver();
        }
      }
      if (this.helicopter.platformCollision()) {
        this.gameWon();
      }
      if (this.helicopter.groundCollision()) {
        this.gameWon();
      }

      this.playerBulletsCollision();
      this.heliBulletsCollision();
      this.player.isLevel();
      this.player.catchesHeli();
    }.bind(this),
    1000 / this.fps
  );
};



    // ======================================================
    // STOP, PLAYER OR HELI WINS, RESET AND PLAY AGAIN OPTIONS

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

// IF JAMES BOND WINS

Game.prototype.gameWon = function() {
  this.stop();
  $("#GameCanvas").remove();
  $("embed").remove();
  $("body").append("<div id='splashScreen'><div class='writing'><h1>BOND WINS</h1><video id='videoOver' width='480' height='360' controls><source src='videos/name_is_Bond.mp4' class='startButton' type='video/mp4'><source src='movie.ogg' type='video/ogg' autostart='true'>Your browser does not support the video tag.</video><h2 id='playAgain'>Play Again?</h2></div></div>");
  $("body").append("<embed src='sounds/ending.mp3' id='music' autostart='true' width='2' height='0'></embed>")
  $("#playAgain").click(function () {
      this.ifPlayAgain();
   }.bind(this));
};

Game.prototype.ifPlayAgain = function() {
  $("#splashScreen").remove();
  $("embed").remove();
  //game.reset();
  $("body").append("<canvas id='canvas'></canvas>")
  $("body").append("<embed src='sounds/goldeneye-n64-theme.mp3' id='music' autostart='true' loop='true' width='2' height='0'></embed>")
  var game = new Game("canvas");
  game.start();
}



// IF HELICOPTER WINS

Game.prototype.gameOver = function() {
  this.stop();
  $("#GameCanvas").remove();
  $("embed").remove();
  $("body").append("<div id='splashScreen'><div class='writing'><h1>HELI WINS</h1><video id='videoOver' width='480' height='360' controls><source src='videos/expect_you_to_die.mp4' class='startButton' type='video/mp4'><source src='movie.ogg' type='video/ogg' autostart='true'>Your browser does not support the video tag.</video><h2 id='playAgain'>Play Again?</h2></div></div>");
  $("body").append("<embed src='sounds/ending.mp3' id='music' autostart='true' width='2' height='0'></embed>")
  $("#playAgain").click(function () {
      $("#splashScreen").remove();
      $("embed").remove();
      $("body").append("<canvas id='canvas'></canvas>")
      $("body").append("<embed src='sounds/goldeneye-n64-theme.mp3' id='music' autostart='true' loop='true' width='2' height='0'></embed>")
      var game = new Game("canvas");
      game.start();
    }.bind(this));
};



// RESET GAME

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.helicopter = new Helicopter(this);
  this.framesCounter = 0;
  this.platforms = [];
  this.gunshot = new Sound("sounds/pistol_shot.wav");
  this.machineGun = new Sound("sounds/machine_gun.mp3");
  this.moonWalk = new Sound("sounds/moonwalk.mp3");
  this.paco = new Sound("sounds/paco.mp3");
};



      // ======================================================
      // KEY CONTROLS FOR BOTH HELICOPTER AND JAMES BOND

Game.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    event.preventDefault();
    if (event.keyCode == this.W_KEY) {
      this.wPressed = true;
    } else if (event.keyCode == this.E_KEY) {
      this.ePressed = true;
    } else if (event.keyCode == this.D_KEY) {
      this.dPressed = true;
    } else if (event.keyCode == this.A_KEY) {
      this.aPressed = true;
    } else if (event.keyCode == this.S_KEY) {
      this.sPressed = true;
    } else if (event.keyCode === this.TOP_KEY && !this.player.isJumping) {
      this.topPressed = true;
      this.player.isJumping = true;
    } else if (event.keyCode == this.SPACE) {
      this.spacePressed = true;
    } else if (event.keyCode == this.RIGHT_KEY) {
      this.rightPressed = true;
    } else if (event.keyCode == this.LEFT_KEY) {
      this.leftPressed = true;
    } else if (event.keyCode == this.MOONWALK) {
      this.moonwalk = true;
    } else if (event.keyCode == this.DANCING) {
      this.dancing = true;
    } else if (event.keyCode == this.MONKEYD) {
      this.monkeyDown = true;
    } else if (event.keyCode == this.SHIFT) {
      this.hanging = true;
    }
  }.bind(this);

  document.onkeyup = function(event) {
    if (event.keyCode == this.W_KEY) {
      this.wPressed = false;
    } else if (event.keyCode == this.E_KEY) {
      this.ePressed = false;
    } else if (event.keyCode == this.D_KEY) {
      this.dPressed = false;
    } else if (event.keyCode == this.A_KEY) {
      this.aPressed = false;
    } else if (event.keyCode == this.S_KEY) {
      this.sPressed = false;
    } else if (event.keyCode === this.TOP_KEY) {
      this.topPressed = false;
      this.player.img.src = "img/bond_right.png";
      this.player.img.frames = 8;
      this.player.w = 31 * 2;
      this.player.h = 47 * 2;
    } else if (event.keyCode == this.SPACE) {
      this.spacePressed = false;
      this.player.img.src = "img/bond_right.png";
      this.player.img.frames = 8;
      this.player.w = 31 * 2;
      this.player.h = 47 * 2;
    } else if (event.keyCode == this.RIGHT_KEY) {
      this.rightPressed = false;
    } else if (event.keyCode == this.LEFT_KEY) {
      this.leftPressed = false;
      this.player.img.src = "img/bond_right.png";
      this.player.img.frames = 8;
      this.player.w = 31 * 2;
      this.player.h = 47 * 2;
    } else if (event.keyCode == this.MOONWALK) {
      this.moonwalk = false;
      this.moonWalk.stop();
      $("body").append("<embed src='sounds/bond_theme_continue.mp3' id='music' autostart='true' width='2' height='0'></embed>")
    } else if (event.keyCode == this.DANCING) {
      this.dancing = false;
      this.player.img.src = "img/bond_right.png";
      this.player.img.frames = 8;
      this.player.w = 31 * 2;
      this.player.h = 47 * 2;
      this.paco.stop();
      $("body").append("<embed src='sounds/bond_theme_continue.mp3' id='music' autostart='true' width='2' height='0'></embed>")
    } else if (event.keyCode == this.MONKEYD) {
      this.monkeyDown = false;
      this.player.img.src = "img/bond_right.png";
      this.player.img.frames = 8;
      this.player.w = 31 * 2;
      this.player.h = 47 * 2;
    } else if (event.keyCode == this.SHIFT) {
      this.hanging = false;
    }
  }.bind(this);
};

Game.prototype.characterMove = function() {
  if (this.wPressed) {
    this.helicopter.y -= 10;
  }
  if (this.dPressed) {
    this.helicopter.x += 10;
    this.helicopter.img.src = "img/helicopter_move.png";
    this.helicopter.img.frames = 7;
  }
  if (this.aPressed) {
    this.helicopter.x -= 10;
    this.helicopter.img.src = "img/helicopter_left.png";
    this.helicopter.img.frames = 7;
  }
  if (this.sPressed) {
    this.helicopter.y += 10;
  }
  if (this.ePressed) {
    this.helicopter.shoot();
    this.machineGun.play();
  }
  if (this.topPressed) {
    this.player.y -= 50;
    this.player.vy -= 10;
    this.player.w = 32 * 2;
    this.player.h = 34 * 2;
    this.player.img.src = "img/james_jump.png";
    this.player.img.frames = 5;
    this.topPressed = false;
  }
  if (this.rightPressed) {
    this.player.x += 5;
    this.player.img.src = "img/bond_right.png";
    this.player.img.frames = 8;
    this.player.w = 31 * 2;
    this.player.h = 47 * 2;
  }
  if (this.leftPressed) {
    this.player.x -= 5;
    this.player.img.src = "img/bond_left.png";
    this.player.img.frames = 8;
    this.player.w = 31 * 2;
    this.player.h = 47 * 2;
  }
  if (this.spacePressed) {
    this.player.shoot();
    this.gunshot.play();
    this.player.img.src = "img/james_shoot.png";
    this.player.img.frames = 5;
    this.player.w = 31 * 2;
    this.player.h = 47 * 2;
  }
  if (this.moonwalk) {
    this.player.x -= 5;
    this.player.img.src = "img/bond_right.png";
    this.player.img.frames = 8;
    this.player.w = 31 * 2;
    this.player.h = 47 * 2;
    $("embed").remove();
    this.moonWalk.play();
  }
  // if (this.dancing) {
  //   this.player.img.src = "img/james_dancing.png";
  //   this.player.img.frames = 8;
  //   this.player.w = 27 * 2;
  //   this.player.h = 49 * 2;
  //   $("embed").remove();
  //   this.paco.play();
  // }
  if (this.monkeyDown) {
    this.player.img.src = "img/james_monkey_dance.png";
    this.player.img.frames = 4;
    this.player.w = 29 * 2;
    this.player.h = 60 * 2;
  }
  if (this.hanging) {
    this.player.vy = 10;
    this.player.y += this.player.vy;
  }
};



    // ======================================================
    // BULLET COLLISIONS WITH PLATFORMS

Game.prototype.playerBulletsCollision = function() {
  for (var i = 0; i < this.platforms.length; i++) {
    for (var j = 0; j < this.player.bullets.length; j++) {
      if (
        this.platforms[i].x + this.platforms[i].w > this.player.bullets[j].x &&
        this.player.bullets[j].x > this.platforms[i].x &&
        this.platforms[i].y + this.platforms[i].h > this.player.bullets[j].y &&
        this.player.bullets[j].y > this.platforms[i].y
      ) {
        this.player.bullets.splice(j);
      }
    }
  }
};

Game.prototype.heliBulletsCollision = function() {
  for (var i = 0; i < this.platforms.length; i++) {
    for (var j = 0; j < this.helicopter.bullets.length; j++) {
      if (
        this.platforms[i].x + this.platforms[i].w >
          this.helicopter.bullets[j].x &&
        this.helicopter.bullets[j].x > this.platforms[i].x &&
        this.platforms[i].y + this.platforms[i].h >
          this.helicopter.bullets[j].y &&
        this.helicopter.bullets[j].y > this.platforms[i].y
      ) {
        this.helicopter.bullets.splice(j);
      }
    }
  }
};




    // ======================================================
    // CLEAR AND GENERATE PLATFORMS

Game.prototype.clearPlatforms = function() {
  this.platforms = this.platforms.filter(function(platform) {
    return platform.x + platform.w >= 0;
  });
};

Game.prototype.generatePlatform = function() {
  this.platforms.push(new Platform(this, this.maxRandomY, this.minRandomY));
};



    // ======================================================
    // CLEAR, RE-DRAW, AND MOVE ALL ELEMENTS

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.helicopter.draw();
  // this.obstacles.forEach(function(obstacle) { obstacle.draw(); });
  this.platforms.forEach(function(platform) {
    platform.draw();
  });
  this.drawHeliPoints();
  this.drawPlayerPoints();
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.characterMove();
  // this.obstacles.forEach(function(obstacle) { obstacle.move(); });
  this.platforms.forEach(function(platform) {
    platform.move();
  });
};



    // ======================================================
    // SCOREBOARD

Game.prototype.drawHeliPoints = function() {
  this.ctx.font = "30px blackOpsOne";
  this.ctx.fillStyle = "red";
  this.ctx.fillText(
    "Heli Points: " + this.helicopter.heliPoints + "/200", 50, 100
  );
};

Game.prototype.drawPlayerPoints = function() {
  this.ctx.font = "30px blackOpsOne";
  this.ctx.fillStyle = "green";
  this.ctx.fillText(
    "Player Points: " + this.player.playerPoints + "/200",
    50,
    50
  );
};
