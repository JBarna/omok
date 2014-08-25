/*Helper class to write to the database!*/
var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

function dbhelper(){
    
    /*private connect helper method*/
    var connectHelper = function(collectionName, next){
        mongo.connect("mongodb://localhost/omok", function(err, db){
            db.collection(collectionName, function(err, collection){
                if (next)
                    next(err, collection);
                setTimeout(function(){ db.close(); }, 1000);
            });
        });
    }
    
    /*public create game method*/
    this.createGame = function(serverGame, gameID, multiplayer){
        connectHelper('game', function(err, collection){
            var newGame = {'gameID': gameID, 'gameOBJ': serverGame, 'multiplayer': multiplayer, 'numPlayers': 1};
            var options = {w:1};
            collection.insert(newGame, options, function(err, results){
                console.log(results);
            });
        });
    }
    
    /*public retreive game object with gameID*/
    this.getGame = function(gameID){
        connectHelper('game', function(err, collection){
            collection.findOne({'gameID': gameID}, {'gameOBJ': 1, '_id': 0}, function(err, item){
                console.log(item);
                return item;
            });
        });
    }
}


module.exports = dbhelper;
            