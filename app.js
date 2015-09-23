
// BASE SETUP ===============================================

'use strict';

var express = require('express');
var path = require('path');
var app = express();

// routes register
var routes = require('./routes/index');
var about = require('./routes/about');

// CONFIGURATION ============================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'))


app.use('/', routes);
app.use('/about', about);


// CREATE SERVER ============================================

app.listen(3000, function(){
    console.log('App started in port 3000');
});

module.exports = app;