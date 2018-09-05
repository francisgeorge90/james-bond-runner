function Player(game) {
  this.game = game;
 
  this.x = 20;

  // guardar posición original (suelo)
  this.y0 = this.game.canvas.height * 0.8;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'img/bond_right.png';
  
  // número de imágenes diferentes
  this.img.frames = 8;
  this.img.frameIndex = 0;

  // medidas de la imagen a representar en el canvas
  this.w = 50;
  this.h = 75;

  this.vy = 1;

  this.bullets = [];

  this.playerPoints = 0;

  this.isJumping = false;

  this.game.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    Math.floor(this.img.width / this.img.frames),
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  this.animateImg();

  this.bullets = this.bullets.filter(function(bullet) {
    return bullet.x < this.game.canvas.width;
  }.bind(this));

  this.bullets.forEach(function(bullet) {
    bullet.draw();
    bullet.move();
  });
};


Player.prototype.shoot = function() {
  var bullet = new Bullet(this.game, this.x + this.w, this.y + this.h / 2);

  this.bullets.push(bullet);
  this.game.spacePressed = false;
};

Player.prototype.animateImg = function() {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  if (this.game.framesCounter % 5 === 0) {
    this.img.frameIndex += 1;

    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};

Player.prototype.move = function() {
  console.log(this.vy)
  // Aumenta la velocidad en el eje y.
  var gravity = 0.4;

  // solo salta cuando el personaje está en el suelo
  if (this.y >= this.y0) {
    this.vy = 1;
    this.y = this.y0;
    this.isJumping = false;
  } else {
    this.vy += gravity;
    this.y += this.vy;
  }

};