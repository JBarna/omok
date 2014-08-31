var express = require('express');
var router = express.Router();

var dbhelper = require('../serverjs/dbhelper');
var Game = require('../serverjs/servergame');

/*Game room--------------------------------------------*/
router.get('/:gameid', function(req, res){
    //check to see if there is a game with that ID
    var db = new dbhelper();
    
    db.getGame(req.param('gameid'), function(err, game){
        if (game){ //if the game exists
            //either not in game or player 1
            if (!req.session.ingame || req.param('gameid') == req.session.gameID){
                //If not in game. Set as player two
                if (!req.session.ingame){
                    req.session.playerID = 2;
                    req.session.ingame = true;
                    req.session.gameID = req.param('gameid');
                }
                
            } else //if client is in another game, redirect back to that game
                res.redirect('/game/' + req.session.gameID);
            
            //render the game page
            res.render('gameroom', {pageTitle: 'Omok Game', js: {'includeClientGame': true}});
        }
        //the game does not exist, redirect to homepage
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