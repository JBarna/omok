var dbhelper = require('./dbhelper');
var Game = require('./servergame.js');
var game = new Game();


var db = new dbhelper();

//db.createGame(game,"wesdfe", true);

var newgame = db.getGame("wesdfe");

process.nextTick(function(){
    console.log(newgame);
});
    
