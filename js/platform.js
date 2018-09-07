function Platform(game, max, min) {
  this.game = game;

  this.w = 300;
  this.h = 15;

  this.dx = 3;

  this.x = this.game.canvas.width;
  this.y = Math.floor(Math.random() * (500 - 350) + 350);
}

    //DRAWS PLATFORM

Platform.prototype.draw = function() {
  this.game.ctx.fillStyle = "black";
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};

    //MOVES PLATFORM

Platform.prototype.move = function() {
  this.x -= this.dx;
};