function Helicopter(game) {
  this.game = game;
 
  this.x = 350;

  // guardar posición original (suelo)
  this.y0 = this.game.canvas.height * 0.1;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'img/helicopter_move.png';
  
  // número de imágenes diferentes
  this.img.frames = 7;
  this.img.frameIndex = 0;

  // medidas de la imagen a representar en el canvas
  this.w = 180;
  this.h = 97;

  this.bullets = [];

  this.heliLives = 10;
  
  this.setListeners();
}

var W_KEY = 87;
var D_KEY = 68;
var A_KEY = 65;
var S_KEY = 83;
var E_KEY = 69;

Helicopter.prototype.draw = function() {
  // Documentación drawImage:
  // https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
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

Helicopter.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode == W_KEY) {
      this.y -= 10;
    } else if (event.keyCode == E_KEY) {
      this.shoot();
    } else if (event.keyCode == D_KEY) {
      this.x += 10;
    } else if (event.keyCode == A_KEY) {
      this.x -= 10;
    } else if (event.keyCode == S_KEY) {
      this.y += 10;
    }
  }.bind(this);
};

Helicopter.prototype.shoot = function() {
  var bullet = new BulletHeli(this.game, this.x + 120, this.y + 150 / 2);

  this.bullets.push(bullet);
};


Helicopter.prototype.animateImg = function() {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  if (this.game.framesCounter % 5 === 0) {
    this.img.frameIndex += 1;

    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};