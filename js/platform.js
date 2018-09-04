function Platform(game) {
  this.game = game;

  this.w = 200;
  this.h = 15;

  this.dx = 5;

  this.x = this.game.canvas.width;
  this.y = Math.floor(Math.random() * (550 - 400) + 400);
}

Platform.prototype.draw = function() {
  this.game.ctx.fillStyle = "black";
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};

Platform.prototype.move = function() {
  this.x -= this.dx;
};