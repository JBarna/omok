var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageTitle: 'Omok', body: "Steven is stupid" });
});



module.exports = router;
