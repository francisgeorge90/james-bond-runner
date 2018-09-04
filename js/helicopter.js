function Helicopter(game) {
  this.game = game;
 
  this.x = 500;

  // guardar posición original (suelo)
  this.y0 = this.game.canvas.height * 0.1;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'img/helicopter';
  
  // número de imágenes diferentes
  this.img.frames = 4;
  this.img.frameIndex = 0;

  // medidas de la imagen a representar en el canvas
  this.w = 423;
  this.h = 153;

  this.vy = 1;

  this.bullets = [];
}

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
};


Helicopter.prototype.animateImg = function() {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  if (this.game.framesCounter % 5 === 0) {
    this.img.frameIndex += 1;

    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};