var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageTitle: 'Omok', js:{'includeClientGame': false}});
});

/*Clear session*/
router.get('/clear', function(req, res){
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
