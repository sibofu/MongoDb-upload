var mongoose = require('mongoose');
var CsvStreamReader = require('./CsvStreamReader');

const pathToCsv = 'Bots.csv';

// once you swtich to a new db, please also update url here. 
const dbName = 'newDb';
mongoose.connect('mongodb://localhost/' + dbName, { useMongoClient: true });
mongoose.Promise = global.Promise;

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
      
      
    postdetail.time = timeStringToNum(new_post.time);
      
  }
}, { timestamps: true });

const Actor = mongoose.model('ActorModel', actorSchema);
const actors = CsvStreamReader.CsvStreamRead(Actor, pathToCsv);
Actor.collection.insert(actors, onInsert);
function onInsert(err) {
    if (err) {
        // TODO: handle error
        console.log("error to store");
    } else {
        console.log('actors successfully stored.');
    }
    mongoose.connection.close();
}