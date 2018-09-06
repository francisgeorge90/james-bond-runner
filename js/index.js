$( document ).ready(function() {
  var button = document.getElementById("startButton");


button.addEventListener("click", function () {
    $("embed").remove();
    $("#splashScreen").remove();
    //  $("body").removeClass("start")
    //  $("h1").remove();
    $("body").append("<canvas id='GameCanvas'></canvas>")
    var game = new Game("GameCanvas");
    $("body").append("<embed src='sounds/goldeneye-n64-theme.mp3' id='music' autostart='true' loop='true' width='2' height='0'></embed>")
    game.start();
});})