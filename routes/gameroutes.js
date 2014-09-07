var express = require('express');
var router = express.Router();

var dbhelper = require('../serverjs/dbhelper');
var Game = require('../serverjs/servergame');

/* POST game/creatgame--------------------------------
Client wants to create a game.*/
router.post('/creategame', function(req, res){

    //create random ID
    var ID = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    //create new game object
    var game = new Game();
    game.createBoard();

    //save board in the database
    var db = new dbhelper();
    db.createGame(ID, game.getBoard(), true);

    //update session so the player is in game
    req.session.ingame = true;
    req.session.playerID = 1;
    req.session.gameID = ID;

    res.redirect('/gameroom/' + ID);
});


module.exports = router;