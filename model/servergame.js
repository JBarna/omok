/*
servergame.js
This class will provide functionality for the game on the server side
You can create, load, make moves, check wins, 
and export the board in array format.
*/
function Board() {
    /*Instance variable. the board!*/
    var board = new Array(15);
    for (var i = 0; i < board.length; i++)
        board[i] = new Array(15);
    
    /*
    Creates board. Saves the board in the database
        if multiplayer = false, then singleplayer
    */
    this.createBoard = function(){
        //initialize values
        for (var i = 0; i < board.length; i++){
            for (var j = 0; j < board[i].length; j++){
                board[i][j] = 0;
            }
        }
    }
    
    
    
    this.getBoard = function(){
        return board;
    }
    
    this.loadBoard = function(newBoard){
        board = newBoard;
    }
        
    this.printBoard = function(){
        for (var i = 0; i < board.length; i++){
            for (var j = 0; j < board[i].length; j++){
                process.stdout.write(board[i][j] + " ");
            }
            console.log("");
        }
    }
    
    this.makeMove = function(x, y, playerID){
        board[y][x] = playerID;
    }
    
    
    this.checkMoveAvailibility = function(x, y){
        return (board[y][x] == 0);
    }
    
    this.checkDoubleThreesHelper = function(playerID, pieceCount, spaceCount, x, y, i, j){
/*        console.log("PID: " + playerID + " pieceC: " + pieceCount + " spaceC: " + spaceCount + " x: " + x + " y: " + y + " i: " + i + " j: " + j);*/
        if (i == 0 && j == 0)
            return 0;
        
        //check boundaries
        if (x < 0 || x > 14 || y < 0 || y > 14)
            return 0;
        
        
        
        if (board[y][x] == playerID){
            pieceCount++;
            
            //if we have more than two others pieces
            if (pieceCount > 2)
                return 0;
                
        } else if(board[y][x] == 0){
            if (pieceCount == 2)
                return 1;
            else if(spaceCount > 0)
                return 0;
            else
                spaceCount++;
        } else //the other player's piece is there
            return 0;
        
        x = x + i;
        y = y + j;
        
        return this.checkDoubleThreesHelper(playerID, pieceCount, spaceCount, x, y, i, j);
    }
                        
    this.checkDoubleThrees = function(x, y, playerID){
        var threes = 0;
        for (var i = -1; i <= 1; i++){
            for (var j = -1; j <= 1; j++){
                threes += this.checkDoubleThreesHelper(playerID, 0, 0, x + i, y + j, i, j);
            }
        }
        //threes += this.checkDoubleThreesHelper(playerID, 0, 0, x, y - 1, 0, -1);
        
        return (threes > 1)
    }
    
    
    this.checkWinHelper = function(playerID, count, x, y, i , j){
        
        if (x < 0 || x > 14 || y < 0 || y > 14)
            return count;
        
        if (board[y][x] == playerID){
            count++;
            x = x + i;
            y = y + j;
            return this.checkWinHelper(playerID, count, x, y, i, j);
        } else
            return count;
    }
        
        
    this.checkWin = function(x, y, playerID){
        
        var i = 1;
        var j = -1;
        //check upper right corner
        if((this.checkWinHelper(playerID, 0, x + i, y + j, i, j) + 
            this.checkWinHelper(playerID, 0, x - i, y - j, -i, -j)) == 4)
            return true;
        
        //check right
        i = 1; j = 0;
        if((this.checkWinHelper(playerID, 0, x + i, y + j, i, j) + 
            this.checkWinHelper(playerID, 0, x - i, y - j, -i, -j)) == 4)
            return true;
        
        //check bottom right
        i = 1; j = 1;
        if((this.checkWinHelper(playerID, 0, x + i, y + j, i, j) + 
            this.checkWinHelper(playerID, 0, x - i, y - j, -i, -j)) == 4)
            return true;
        
        //check underneath
        i = 0; j = 1;
        if((this.checkWinHelper(playerID, 0, x + i, y + j, i, j) + 
            this.checkWinHelper(playerID, 0, x - i, y - j, -i, -j)) == 4)
            return true
            
        return false;
    }
}

module.exports = Board;