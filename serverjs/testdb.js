var dbhelper = require('./dbhelper');
var Game = require('./servergame.js');
var db = new dbhelper();

/*//create game
var game = new Game();

game.createBoard();

//create game in database
db.createGame("aaaaa", game.getBoard(), true);*/



//make move in game
//first we will access the game through db helper
db.getGame("aaaaa", function(err, board){
    var game = new Game();
    game.loadBoard(board);
    game.printBoard();
    /*game.makeMove(1,1,2);
    db.saveGame("aaaaa", game.getBoard());*/
    
});
    