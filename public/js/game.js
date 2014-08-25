function Board() {
    var board = new Array(15);
    for (var i = 0; i < board.length; i++)
        board[i] = new Array(15);
    
    //initialize values
    for (var i = 0; i < board.length; i++){
        for (var j = 0; j < board[i].length; j++){
            board[i][j] = 0;
        }
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

function Game() {
    this.board = new Board();
    /*this.player1 = new Player();
    this.player2 = new Player();*/
}

module.exports = Board;