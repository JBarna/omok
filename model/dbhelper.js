/*Helper class to write to the database!*/
var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

/*private connect helper method*/
var connectHelper = function(collectionName, next){
    mongo.connect(process.env.MONGOLAB_URI || "mongodb://localhost/omok", function(err, db){
        db.collection(collectionName, function(err, collection){
            if (next)
                next(err, collection);
            setTimeout(function(){ db.close(); }, 1000);
        });
    });
}

/*public retreive board object with gameID*/
exports.getGame = function(gameID, next){
    connectHelper('game', function(err, collection){
        collection.findOne({'gameID': gameID}, {'board': 1, '_id': 0}, function(err, item){
            /*console.log("item: ");
            console.log(item);*/
            if (item)
                next(err, item.board);
            else
                next(err, null);
        });
    });
}

/*public create game method*/
exports.createGame = function(gameID, boardArray, multiplayer){
    connectHelper('game', function(err, collection){
        var newGame = {'gameID': gameID, 'board': boardArray, 'multiplayer': multiplayer, 'numPlayers': 1};
        var options = {w:1};
        collection.insert(newGame, options, function(err, results){
            //console.log(results);
        });
    });
}

/*public save game method*/
exports.saveGame = function(gameID, boardArray){
    connectHelper('game', function(err, collection){
        var query = {'gameID': gameID};
        var update = { '$set': {'board': boardArray}};
        var options = {w:1, wtimeout:5000, upsert:false};
        collection.update(query, update, options, function(err, results){
            console.log(results);
        });
    });

}
            