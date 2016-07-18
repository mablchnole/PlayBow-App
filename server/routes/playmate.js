var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');

// require to upload images
var multer = require('multer');
var fs = require('fs');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var s3 = new aws.S3();

var connectionString = require('../modules/connection');

////////////////////////////////////////////////////////////
//             ROUTES TO ADD NEW PLAYMATE                 //
////////////////////////////////////////////////////////////

// post route to insert new playmate into the database
router.post('/addPlaymate', function (req, res){
  console.log('in addPlaymate server post route, adding:', req.body.name);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendPlaymate = client.query('INSERT INTO playmates (name, breed, age, gender, sterile, vaccinated, location, size, playstyles) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [req.body.name, req.body.breed, req.body.age, req.body.gender, req.body.sterile, req.body.vaccinated, req.body.location, req.body.size, req.body.playstyles]);
      sendPlaymate.on('end', function(){
        return res.end();
      });
    }
    done();
  });
}); // end addPlaymate route

// get route to retrieve all playmates from the database
router.get('/getPlaymates', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var callDatabase = client.query('SELECT * FROM playmates;');
    // push each row in query into our results array
    callDatabase.on('row', function(row) {
      results.push(row);
    }); // end query push
    callDatabase.on('end', function(){
      console.log('who let the dogs out?!', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
}); // end getPlaymates route

////////////////////////////////////////////////////////////
//               ROUTES TO ADD TO FAVES                   //
////////////////////////////////////////////////////////////

// post route to insert fave into the database
router.post('/addFave', function (req, res){
  console.log('in addFave server post route, run:', req.body.name);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendFave = client.query('INSERT INTO favorites (name, breed, age, gender, sterile, vaccinated, location) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [req.body.name, req.body.breed, req.body.age, req.body.gender, req.body.sterile, req.body.vaccinated, req.body.location]);

      sendFave.on('end', function(){
        return res.end();
      });
    }
    done();
  });
}); // end addFave route

// get route to retrieve all faves from the database
router.get('/getFaves', function(req, res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var callDatabase = client.query('SELECT * FROM favorites;');
    // push each row in query into our results array
    callDatabase.on('row', function(row) {
      results.push(row);
    }); // end query push
    callDatabase.on('end', function(){
      console.log('FAVORITES BACK FROM DATABASE SUCCESS', results);
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  }); // end pg connect
}); // end getFaves route

// remove fave from database
router.delete('/removeFave', function (req, res){
  console.log('in server going to db to remove fave');
  pg.connect(connectionString, function(err, client, done){
    client.query('DELETE FROM favorites WHERE id=' + req.body.id);
    console.log('in delete route removeFave id:', req.body.id);
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
    done();
    console.log('back from database delete route');
  });
}); // end removeFave

////////////////////////////////////////////////////////////
//                 UPLOAD IMAGES ROUTES                   //
////////////////////////////////////////////////////////////

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'prime-digital-academy-playbow',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      // file name generation
      cb(null, Date.now().toString());
    }
  })
}); // end multer upload

// upload post route
router.post('/uploads', upload.single('file'), function(req, res) {
  console.log('in post uploads:', req.file);
  res.send(req.file);
});

// get uploads




module.exports = router;
