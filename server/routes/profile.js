var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../modules/connection');

////////////////////////////////////////////////////////////
//       ROUTE TO RETRIEVE NEWEST PLAYMATE PROFILE        //
////////////////////////////////////////////////////////////

router.get('/getPlaymatesToFilter', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var callDatabase = client.query('SELECT * FROM playmates;');
    // push each row in query into our results array
    callDatabase.on('row', function(row) {
      results.push(row);
    }); // end query push
    callDatabase.on('end', function(){
      console.log('all playmates to filter back from db:', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
}); // end getProfile route

router.get('/getNewest', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var callDatabase = client.query('SELECT * FROM playmates ORDER BY created DESC LIMIT 1;');
    // push each row in query into our results array
    callDatabase.on('row', function(row) {
      results.push(row);
    }); // end query push
    callDatabase.on('end', function(){
      console.log('newest created playmate back from the database:', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
}); // end getProfile route




module.exports = router;
