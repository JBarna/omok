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
            
            socket.on('gamemove', function(move){
                console.log(move);
                //emit the move to all the players
                io.to(gameid).emit('gamemove', {'PlayerID': req.session.playerID, 'data': move});
            });

            socket.on('disconnect', function(){
                console.log("user disconnected");
                socket.leave(gameid);
            });
            console.log("a user has connected to game room: " + gameid);
            
            
        });

        //check to see if there is a game with that ID
        var ifGameExists = function(){ 
            //either not in game or player 1
            if (!req.session.ingame || gameid == req.session.gameID){
                
                //If not in game. Set as player two
                //otherwise do nothing
                if (!req.session.ingame){
                    req.session.playerID = 2;
                    req.session.ingame = true;
                    req.session.gameID = gameid;
                }

            } else //if client is in another game, redirect back to that game
                res.redirect('/gameroom/' + req.session.gameID);

            //render the game page
            res.render('gameroom', {pageTitle: 'Omok Game', js: {'includeClientGame': true}});
        }
        
        var ifgamedoesnotexist = function(){
            //the game does not exist, redirect to homepage
            res.redirect('/');
        };
        
        model.checkGameExistence(gameid, ifGameExists, ifgamedoesnotexist); 
    };
}
        
    
    
    