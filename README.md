# Play Game

click here:
https://francisgeorge90.github.io/james-bond-runner/


Player.prototype.isLevel = function() {
  this.game.platforms.some(
    function(platform) {
      if (
        this.x + this.w > platform.x &&
        platform.x + platform.w > this.x &&
        this.y + this.h > platform.y &&
        platform.y + platform.h > this.y &&
        this.vy > 0
      ) {
        this.vy = 0;
        this.y = platform.y - this.h;
        this.isJumping = false;
      }
    }.bind(this)
  );
};


Game.prototype.setListeners = function() {

  document.onkeydown = function(event) {
    event.preventDefault();
    var pressedkey = Object.keys(Keyboard).filter(function(e){
      return Keyboard[e].keyCode == event.keyCode;
    });
    console.log(pressedkey)
    if (Keyboard[pressedkey] == Keyboard.TOP && !this.player.isJumping) {
      Keyboard[pressedkey[0]].pressed = true;
      this.player.isJumping = true;
    } else if (pressedkey.length == 1){   
      Keyboard[pressedkey[0]].pressed = true;
    }
  }.bind(this);
