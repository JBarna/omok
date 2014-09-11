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
        collection.findOne({'gameID': gameID}/*, {'board': 1, '_id': 0}*/, function(err, item){
            /*console.log("item: ");
            console.log(item);*/
            if (item)
                next(err, item);
            else
                next(err, null);
        });
    });
}

/*public create game method*/
exports.createGame = function(gameID, boardType, boardArray, multiplayer){
    connectHelper('game', function(err, collection){
        var newGame = {'gameID': gameID, 'boardType': boardType,
                       'board': boardArray, 'multiplayer': multiplayer, 'numPlayers': 0};
        var options = {w:1};
        collection.insert(newGame, options, function(err, results){
            //console.log(results);
        });
    });
}

/*public save game method*/
exports.saveGame = function(gameID, update){
    connectHelper('game', function(err, collection){
        var query = {'gameID': gameID};
        /*var update = { '$set': {'board': boardArray*/ 
        //replace this with the update that's passed in
        var options = {w:1, wtimeout:5000, upsert:false};
        collection.update(query, update, options, function(err, results){
            //console.log(results);
        });
    });

}
            