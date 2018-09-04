function Platform(game) {
  this.game = game;

  this.w = 200;
  this.h = 15;

  this.maxRandomY = 550;
  this.minRandomY = 500;

  this.dx = 3;

  this.x = this.game.canvas.width;
  this.y = Math.floor(Math.random() * (this.maxRandomY - this.minRandomY) + this.minRandomY);
}

Platform.prototype.draw = function() {
  this.game.ctx.fillStyle = "black";
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};

Platform.prototype.move = function() {
  this.x -= this.dx;
};