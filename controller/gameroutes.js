/*Joel Barna
Gameroutes.js
Manages routes in '/game/'
*/

var express = require('express');
var router = express.Router();
var model = require('../model/model.js');

/* POST game/creatgame--------------------------------
Client wants to create a game.*/
router.post('/creategame', function(req, res){
    
    console.log(req.body.gameboard);
    //use model to create game and get ID
    var ID = model.createGame(req.body.gameboard);
    
    //update session so the player is in game
    req.session.ingame = true;
    req.session.playerID = 1;
    req.session.gameID = ID;

    res.redirect('/gameroom/' + ID);
});


module.exports = router;