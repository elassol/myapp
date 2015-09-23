var express = require('express')
  , router = express.Router()

app.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = router