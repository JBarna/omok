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
    dbhelper.createGame(ID, board, true);
    
    return ID;
};

/*checkGameExistence----------------------------------------
Checks db to see if game exists
calls a function if yes or no because we can't 
return I guess
*/
exports.checkGameExistence = function(gameID, ifyes, ifno){
    dbhelper.getGame(gameID, function(err, game){
        if (game){
            if(ifyes)
                ifyes();
        } else{
            if(ifno)
                ifno();
        }
    });
};




    
    