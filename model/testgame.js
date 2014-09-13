var Game = require('./servergame.js');
var board = new Game();

board.createBoard();


/*Check win*/
/*board.makeMove(3, 0, 2);
board.makeMove(4,0, 2);
board.makeMove(5,0, 2);
board.makeMove(6,0, 2);
board.makeMove(7,0, 2);

board.printBoard();
console.log(board.checkWin(2, 2, 2));

*/

/*check threes*/
board.makeMove(2, 2, 2);
board.makeMove(2, 3, 2);

board.makeMove(3, 5, 2);
board.makeMove(4, 5, 2);

board.makeMove(3, 6, 2);
board.makeMove(4, 7, 2);

board.makeMove(0, 5, 2);
board.makeMove(1, 5, 2);


console.log(board.checkDoubleThrees(2, 5, 2));
board.printBoard();



