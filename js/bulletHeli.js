function BulletHeli(game, x, y) {
  this.game = game;

  this.x = x;
  this.y = y;

  this.r = 5;

  this.vx = 10;
  this.vy = +10;

  this.heliBulletsCollision();
}

BulletHeli.prototype.draw = function() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle = "red";
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
}

BulletHeli.prototype.move = function() {
  // this.x += this.vx;
  this.y += this.vy
};

BulletHeli.prototype.heliBulletsCollision = function() {
  for (var i = 0; i < this.game.platforms.length; i++) {
    for (var j = 0; j < this.game.helicopter.bullets.length; j++) {
      if (
        this.game.platforms[i].x + this.game.platforms[i].w >
          this.game.helicopter.bullets[j].x &&
        this.game.helicopter.bullets[j].x > this.game.platforms[i].x &&
        this.game.platforms[i].y + this.game.platforms[i].h >
          this.game.helicopter.bullets[j].y &&
        this.game.helicopter.bullets[j].y > this.game.platforms[i].y
      ) {
        this.game.helicopter.bullets.splice(j);
      }
    }
  }
};