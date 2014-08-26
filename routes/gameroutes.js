var express = require('express');
var router = express.Router();

var dbhelper = require('../serverjs/dbhelper');
var Game = require('../serverjs/servergame');


router.get('/:gameid', function(req, res){
    res.render('gameroom', {pageTitle: 'Omok Game', js: {'includeClientGame': true}});
});

/* POST game/creatgame
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
    
    res.redirect('/game/' + ID);
});

/*send server the game move*/
router.post('/gamemove', function(req, res){
    console.log("He has moved at gridX: " + req.body.moveX + " and gridY: " + req.body.moveY);
    
    res.send(JSON.stringify({yourip: req.ip}));
});

module.exports = router;