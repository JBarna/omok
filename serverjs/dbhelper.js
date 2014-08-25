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
    this.createGame = function(gameID, multiplayer){
        connectHelper('game', function(err, collection){
            var newGame = {'gameID': gameID, 'multiplayer': multiplayer, 'numPlayers': 1};
            var options = {w:1};
            collection.insert(newGame, options, function(err, results){
                console.log(results);
            });
        });
    }
}

module.exports = dbhelper;
            