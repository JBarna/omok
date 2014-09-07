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
    
    this.checkWinHelper = function( playerID,  count,  i,  j,  k,  l){
        if (count == 1)
            return true;
        
        if (k == 0 && l == 0)
            return false;
        
        if (board[i + k][j + l] == playerID){
            i = i + k;
            j = j + l;
            count--;
            return this.checkWinHelper(playerID, count, i, j, k, l);
        } else
            return false;
    }
                        
    this.checkWin = function(){
        for (var i = 0; i < board.length; i++){
            for (var j = 0; j < board[i].length; j++){
                if (board[i][j] == 1 || board[i][j] == 2){
                    for (var k = -1; k <= 1; k++){
                        for (var l = -1; l <= 1; l++){
                            if (this.checkWinHelper(board[i][j], 5, i, j, k, l)){
                                console.log("Win!");
                            }
                        }
                    }   
                }
            }
        }
    }
}

module.exports = Board;