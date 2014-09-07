var Game = require('./servergame.js');
var game = new Game();

var board = game.board;
console.log(board.getBoard());

var boardarray = board.getBoard();

boardarray[2][4] = 3;
console.log(boardarray);

board.loadBoard(boardarray);
board.printBoard();
/*board.makeMove(3, 1, 2);
board.makeMove(4,1, 2);
board.makeMove(5,1, 2);
board.makeMove(6,1, 2);
board.makeMove(7,1, 2);
board.printBoard();
board.checkWin();

console.log(board);*/