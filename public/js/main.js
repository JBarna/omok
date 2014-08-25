$(document).ready(function(){
    
    /*if in game room load clientgame.js*/
    if(window.location.pathname.search('game') > -1){
        var game = new Game();
        game.createGame();
    }
    
});



    