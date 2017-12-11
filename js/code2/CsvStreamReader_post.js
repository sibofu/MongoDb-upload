var fs = require('fs');
var csv = require('fast-csv');
var Parser1 = require('./Parser');
var Parser2 = require('./Parser_post');
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

//streamread data in bots to actormodel
const actors = [];
exports.CsvStreamRead = (ActorModel, pathToCsv) => {
	const actors = [];
	fs.createReadStream(pathToCsv)
		.pipe(csv())
		.on('data', function(data){
			// this function is called for each row in csv.
			const actorJson = Parser1.parser(data);
			const newActor = new ActorModel({
				class: actorJson.class,
				username: actorJson.username,
				profile: {
					name: actorJson.name,
					gender: actorJson.gender,
					age: actorJson.age,
					location: actorJson.location,
					bio: actorJson.bio,
					picture: actorJson.picture
				}
			});
			actors.push(newActor);
		})
		.on('end', function(data){
			console.log('Read finished');
		});
	return actors;
}



const posts = [];
exports.CsvStreamRead = (PostModel, pathToCsv) => {
    
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost/newDb";
//const dbName = 'newDb';
//mongoose.connect('mongodb://localhost/' + dbName, { useMongoClient: true });
//mongoose.Promise = global.Promise;

	fs.createReadStream(pathToCsv)
		.pipe(csv())
		.on('data', function(data){
			// this function is called for each row in csv.
			const postsJson = Parser2.parser(data);
        
        
            //var actor_ob = actors.findOne({username: postsJson.actor});
			const newPost = new PostModel({
   
                actor: findOne(postsJson.actor),
				body: postsJson.body,
				post_id: postsJson.id,
				class: postsJson.class,
				picture: postsJson.picture,
				likes: getLikes(),
				lowread: getReads(6,20),
				highread: getReads(145,203),
                time: postsJson.time
            
					
			
			});
            console.log(newPost.actor);
			posts.push(newPost);
		})
		.on('end', function(data){
			console.log('Read finished');
		});
	return posts;
}
