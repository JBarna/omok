var express = require('express');
var router = express.Router();


router.get('/:gameid', function(req, res){
    res.render('gameroom', {pageTitle: 'Omok Game', 'includeClientGame': true});
});




/* POST game/creatgame
Client wants to create a game.
Create a unique ID for it and send
that back to the user.*/
router.post('/creategame', function(req, res){
    var ID = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    
    res.redirect('/game/' + ID);
});

/*send server the game move*/
router.post('/gamemove', function(req, res){
    console.log("He has moved at gridX: " + req.body.moveX + " and gridY: " + req.body.moveY);
    
    res.send(JSON.stringify({yourip: req.ip}));
});

module.exports = router;