var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var dbhelper = require('../serverjs/dbhelper');
var Game = require('../serverjs/servergame');

/*Game room--------------------------------------------*/
router.get('/:gameid', function(req, res){
    //check to see if there is a game with that ID
    var db = new dbhelper();
    
    db.getGame(req.param('gameid'), function(err, game){
        if (game){
            //if we aren't currently ingame, we can join
            if (!req.session.ingame){
                req.session.playerID = 2;
                req.session.ingame = true;
                req.session.gameID = req.param('gameid');
                
                //set up socket.io connection
                io.on('connection', function(socket){
                    console.log("Player " + req.session.playerID + " has connected to game room " + req.session.gameID);
                    
                });
                    
                
                //if we are in another game, redirect to our game
            } else if (req.param('gameid') != req.session.gameID){ 
                res.redirect('/game/' + req.session.gameID);
            }
            res.render('gameroom', {pageTitle: 'Omok Game', js: {'includeClientGame': true}});
        }
        else
            res.redirect('/');
    });
    
    
});

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
    
    res.redirect('/game/' + ID);
});


module.exports = router;