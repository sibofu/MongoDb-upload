var mongoose = require('mongoose');
var CsvStreamReader = require('./CsvStreamReader_post');

const pathToCsv1 = 'Posts.csv';
const pathToCsv2 = 'bots.csv';

// once you swtich to a new db, please also update url here. 
const dbName = 'newDb';
mongoose.connect('mongodb://localhost/' + dbName, { useMongoClient: true });
mongoose.Promise = global.Promise;

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

const actorSchema = new mongoose.Schema({
  class: String, //normal, bully, victim, highread,cohort
  username: String,
  profile: {
    name: String,
    gender: String,
    age: Number,
    location: String,
    bio: String,
    picture: String
  }
}, { timestamps: true });

const Actor = mongoose.model('ActorModel', actorSchema);
const actors = CsvStreamReader.CsvStreamRead(Actor, pathToCsv1);
Actor.collection.insert(actors, onInsert);
function onInsert(err) {
    if (err) {
        // TODO: handle error
        console.log("error to store");
    } else {
        console.log('actors successfully stored.');
    }
}

const postSchema = new mongoose.Schema({
    
    actor: {},
    body: String,
    post_id: Number,
    class: String, //normal, bully, victim, highread,cohort
    picture: String,
    likes: Number,
    lowread: Number,
    highread: Number,
    time: Number,
  
 });

const Post = mongoose.model('PostModel', postSchema);
const posts = CsvStreamReader.CsvStreamRead(Post, pathToCsv2);
Post.collection.insert(posts, onInsert);
function onInsert(err) {
    if (err) {
        // TODO: handle error
        console.log("error to store");
    } else {
        console.log('posts successfully stored.');
    }
    mongoose.connection.close();
}