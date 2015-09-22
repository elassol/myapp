'use strict';

// BASE SETUP ===============================================

var express = require('express');
var app = express();
var router = express.Router();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(router);
app.use(express.static('public'));



app.get('/', function(req, res) {
    // res.sendfile('./index.html');
    res.render('index',{ title : 'Home' })
});

app.get('/about',function(req, res) {
    // res.sendfile('./index.html');
    res.render('about',{ title : 'about' })
});

// CREATE SERVER ============================================

app.listen(3000, function(){
    console.log('App started');
});

module.exports = app;