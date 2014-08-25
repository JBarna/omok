var Game = require('./game.js');
var game = new Game();

var board = game.board;

board.makeMove(3, 1, 2);
board.makeMove(4,1, 2);
board.makeMove(5,1, 2);
board.makeMove(6,1, 2);
board.makeMove(7,1, 2);
board.printBoard();
board.checkWin();