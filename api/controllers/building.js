'use strict';
var util = require('util');

module.exports = {
  buildings: getAllBuildings
};

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function getAllBuildings(req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected to Database !");
    var dbo = db.db("cyberholocampus");

    dbo.collection("buildings").find({}).toArray(function(err, result) {
      if (err) throw err;

      var buildings = [];

      result.forEach(function(item){
        var building = {};
        building._id = item._id;
        building.name = item.name;
        building.position = item.position;
        building.type = item.type;
        building.info = item.info;
        buildings.push(building);
      });

      // this sends back a JSON response which is a single string
      res.json(buildings);
    });

    db.close();
  });

}
