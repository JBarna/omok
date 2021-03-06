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
exports.createGame = function(boardType){
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
    dbhelper.createGame(ID, boardType, board, true);
    
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

/*Check # of players in game---------------------------------
check db to find the number of players in the game
*/
exports.checkNumOfPlayers = function(gameID, callback){
    dbhelper.getGame(gameID, function(err, game){
        if(callback)
            callback(game.numPlayers);
    });
};

/*AddPlayerToGame--------------------------------------------
update the database to add one player
*/
exports.addPlayerToGame = function(gameID){
    var update = {'$inc' : {'numPlayers': 1}};
    dbhelper.saveGame(gameID, update);
    
}

/*Get Board Type---------------------------------------------
return the board type of a game ID
*/
exports.getBoardType = function(gameID, callback){
    dbhelper.getGame(gameID, function(err, game){
        callback(game.boardType);
    });
}

/*removeGameDueToDisconnect------------------------------------
after a certain amount of time,
check to see if both players are still there.
If not, delete the game and call the 
specific callback
*/
/*exports.removeGameDueToDisconnect = function(gameID, wait, remove_callback, exist_callback){
    var */

/*validateMove-------------------------------------------------
will check the move to see if
there's already another piece on the board, 
double threes, 
or win*/
exports.validateMove = function(gameID, playerID, x, y, callback){
    dbhelper.getGame(gameID, function(err, game){
        
        //set up variables
        var servergame = new Game();
        servergame.loadBoard(game.board);
        var dataToReturn = {"moveSuccess": true, "moveError": "", "win": false };
        
        if (servergame.checkMoveAvailibility(x,y)){
            //check win
            if (servergame.checkWin(x, y, playerID))
                dataToReturn.win = true;
            else {
                if(servergame.checkDoubleThrees(x, y, playerID)){
                    dataToReturn.moveSuccess = false;
                    dataToReturn.moveError = "Cannot create double threes";
                }
            }
            
        } else {
            dataToReturn.moveSuccess = false;
            dataToReturn.moveError = "Space already taken";
        }
        
        //if no issue, make the move
        if(dataToReturn.moveSuccess){
            servergame.makeMove(x, y, playerID);
            //put back into the database
            var update = { '$set': {'board': servergame.getBoard()}};
            dbhelper.saveGame(gameID, update);
        }
        
        callback(dataToReturn);
    });
};
    
            
            
            