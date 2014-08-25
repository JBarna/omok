var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageTitle: 'Omok', body: "Steven is stupid" });
});

router.post('/gamemove', function(req, res){
    console.log("He has moved at gridX: " + req.body.moveX + " and gridY: " + req.body.moveY);
    
    res.send(JSON.stringify({yourip: req.ip}));
});

module.exports = router;
