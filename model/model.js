/* Joel Barna
model.js
This will provide an adapator inferface 
for the servergame.js and dbhlper.js
This will help the skinny controller
fat model MVC model*/

var dbhelper = require('./dbhelper');
var Game = require('./servergame');


/*create game----------------------------------------
Create unique token
create game board
place game board in db
return */
exports.createGame = function(){
    //create random ID
    var ID = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    
    //create new game object
    var game = new Game();
    game.createBoard();
    var board = game.getBoard();
    
    //save board in database
    var db = new dbhelper();
    db.createGame(ID, board, true);
    
    return ID;
};

    
    