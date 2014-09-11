var model = require('../model/model');

exports.gameroom = function(io){
    //set up socket connection
        io.on('connection', function(socket){
            
            //initialize socket game attributes
            socket.gameattributes = {};
            
            socket.on('joinroom', function(room){
                socket.room = room;
                socket.join(room);
                
                //set player id
                model.checkNumOfPlayers(room, function(num){    
                    if (num < 2){
                        socket.gameattributes.playerID = num + 1;
                        //update the database to the correct number of players
                        model.addPlayerToGame(room);
                    } 
                        
                });
                    
            });
            
            
            socket.on('gamemove', function(move){
                //emit the move to all the players
                if (socket.gameattributes.playerID)
                    io.to(socket.room).emit('gamemove', {'playerID': socket.gameattributes.playerID,
                                                    'move': move});
            });

            socket.on('disconnect', function(){
                console.log("user disconnected");
            });
            
            console.log("a user has connected");

        });

    //return express get function
    return function(req, res){
        var gameid = req.param('gameid');       

        //check to see if there is a game with that ID
        var ifGameExists = function(){ 
            
            model.checkNumOfPlayers(gameid);
            
            //either not in game or player 1
            if (!req.session.ingame){
                
            //If not in game. Set as player two
                //check if there are two players
                model.checkNumOfPlayers(function(num){
                    if (num < 2){
                        req.session.playerID = 2;
                        req.session.ingame = true;
                        req.session.gameID = gameid;
                    }
                });

            } 
            //if client is in another game, redirect back to that game
            else if(gameid != req.session.gameID) 
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
        
    
    
    