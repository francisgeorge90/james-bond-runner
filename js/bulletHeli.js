function BulletHeli(game, x, y) {
  this.game = game;

  this.x = x;
  this.y = y;

  this.r = 5;

  this.vx = 10;
  this.vy = +10;
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