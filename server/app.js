// for image uploading
require('dotenv').load();

// dependencies
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// set client directory as static
app.use(express.static('client'));

// middleware
app.use(bodyParser.json());

// include routes
var playmate = require('./routes/playmate');
var profile = require('./routes/profile');

// use routes
app.use('/', playmate);
app.use('/', profile);

// base url to show path resolved index.html
app.get('/', function(req, res){
  console.log('bow wow at basecamp');
  res.sendFile(path.resolve('client/views/index.html'));
});

app.listen(process.env.PORT || 4500, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// set up server
// app.set('port', process.env.PORT || 1234);
//
// app.listen(app.get('port'), function() {
//   console.log('human, are you awake:', app.get('port'));
// });
