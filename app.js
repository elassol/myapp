var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



app.use(express.static(__dirname + '/public'));

app.listen(3000)