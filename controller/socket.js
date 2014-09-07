var dbhelper = require('../model/dbhelper');
var Game = require('../model/servergame');
var model = require('../model/model');

exports.gameroom = function(io){
    //return express get function
    return function(req, res){
        var gameid = req.param('gameid');

        // set up socket connection
        io.on('connection', function(socket){
            socket.join(gameid);
            setInterval(function(){socket.to(gameid).emit('msg', "hello");}, 1000);
            console.log("a user has connected to game room: " + gameid);
            
        });

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
                    res.redirect('/gameroom/' + req.session.gameID);

                //render the game page
                res.render('gameroom', {pageTitle: 'Omok Game', js: {'includeClientGame': true}});
            }
            //the game does not exist, redirect to homepage
            else
                res.redirect('/');
        });
    };
}

/*exports.gamemove = function(io){
    //return express function for post
    return function(req, res){*/
        
    
    
    