'use strict';
var util = require('util');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  getRooms: getRooms,
  setRoom: setRoom
};

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function getRooms(req, res) {

  var building_id = req.swagger.params.idBuilding.value;
  console.log(building_id);

  MongoClient.connect(url, function (err, db) {

    if(err) throw err;
    var dbo = db.db("cyberholocampus");
    console.log("Connected to Database !");

    dbo.collection("buildings").findOne({"_id" : new ObjectId(building_id)}, function(err, result){

      if(err) throw err;
      console.log(result);

      res.json(result.rooms || []);

    });

  });

}

function setRoom(req, res) {

  var building_id = req.swagger.params.idBuilding.value;
  var room_id = req.swagger.params.idRoom.value;
  var data = req.swagger.params.data.value;


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cyberholocampus");
    console.log("Connected to Database !");
    /*
    dbo.collection("buildings").updateOne(
      {"_id" : new ObjectId(building_id)},
      {$set: {
        room.room_id : {
          data
        }
      }}
      function(err, result) {
        if (err) throw err;
        console.log(result.anchors);

        res.status(200);
      }
    );
    */

    db.close();
  });

}
