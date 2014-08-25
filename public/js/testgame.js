var game = require('./game.js');

var board = new game();

board.makeMove(3, 1, 2);
board.makeMove(4,1, 2);
board.makeMove(5,1, 2);
board.makeMove(6,1, 2);
board.makeMove(7,1, 2);
board.printBoard();
board.checkWin();