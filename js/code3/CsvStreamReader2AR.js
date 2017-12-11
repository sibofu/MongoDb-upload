var fs = require('fs');
var csv = require('fast-csv');
var Parser = require('./Parser');
//modify to correct parser file name before runing program

var Parser1 = require('./Parser');
var Parser2 = require('./Parser_post');
var Parser3 = require('./Parser')
//var db = "newDb";
//var Actor = require('./MongoConn');

//helper functions to fill out field likes, highread, lowread, time
function timeStringToNum (v) {
  var timeParts = v.split(":");
  return parseInt(((timeParts[0] * (60000 * 60)) + (timeParts[1] * 60000)), 10);
}

function getLikes() {
  var notRandomNumbers = [1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6];
  var idx = Math.floor(Math.random() * notRandomNumbers.length);
  return notRandomNumbers[idx];
}

function getReads(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
/*
var mongoClient = require('mongodb').MongoClient;
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('actormodels');
  // Find some documents
  collection.find({'username': "SnakeCharmer"}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}*/

function findOne(name){
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/newDb";
var username = "SnakeCharmer";
var userExists2 = [];

var verifyUserExists = function(db, callback, name) {

var collection = url.collection('actormodels');

  collection.findOne({ "username": name }, function(err, doc) {
    //assert.equal(null, err);
    callback(doc);
  });

}

mongoClient.connect(url, function(err, db) {
  //assert.equal(null, err);
  console.log('Connected successfully to server');

  verifyUserExists(db, function(userExists) {
    console.log(userExists);
    userExists2 = userExists;
     console.log(userExists2);
    db.close();
  }, name);
    //console.log(userExists2);
    console.log('test');
});    

}


exports.CsvStreamRead = (ReplyModel, pathToCsv) => {
	const replys = [];
	fs.createReadStream(pathToCsv)
		.pipe(csv())
		.on('data', function(data){
			// this function is called for each row in csv.
			const replyJson = Parser3.parser(data);
			const newReply = new ReplyModel({
                actor: findOne(replyJson.actor),
                replyID: replyJson.reply,
                body: replyJson.body,
                post_id: 300 + replyJson.postid;
				class: replyJson.class,
                picture: replyJson.picture;
                likes: getLikes(),
				lowread: getReads(6,20),
				highread: getReads(145,203),
                actor.$id =  actor._id.toString(),
                time: postsJson.time
				
                    
                    
                    
				}
			});
			replys.push(newReply);
		})
		.on('end', function(data){
			console.log('Read finished');
		});
	return replys;
}
