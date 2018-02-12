'use strict';
var util = require('util');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  getAnchors: getAnchors,
  setAnchors: setAnchors
};

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function getAnchors(req, res) {

  var building_id = req.swagger.params.idBuilding.value;
  console.log(building_id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected to Database !");
    var dbo = db.db("cyberholocampus");

    dbo.collection("buildings").findOne({"_id" : new ObjectId(building_id)}, function(err, result) {
      if (err) throw err;
      console.log(result.anchors);

      // this sends back a JSON response which is a single string
      res.json(result.anchors);

    });

    db.close();
  });

}

function setAnchors(req, res) {

var building_id = req.swagger.params.idBuilding.value;
  var content = req.swagger.params.data.value;
  console.log(content);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected to Database !");
    var dbo = db.db("cyberholocampus");

    dbo.collection("buildings").updateOne(
      {"_id" : new ObjectId(building_id)},
      {$set: {"anchors" : content.data}},
      function(err, result) {
        if (err) throw err;

        res.status(200);
        console.log(res.statusCode);
    });

    db.close();
  });

}
