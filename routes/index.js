var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'index index contro' });
});

router.get('/about', function(req, res) {
    res.render('about', { title: 'about index contro' });
});

module.exports = router;