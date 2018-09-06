$( document ).ready(function() {
  var button = document.getElementById("startButton");

button.addEventListener("click", function () {
   $("#splashScreen").remove();
  //  $("body").removeClass("start")
  //  $("h1").remove();
   $("body").append("<canvas id='GameCanvas'></canvas>")
   var game = new Game("GameCanvas");
   game.start();
});})