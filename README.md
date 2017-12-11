# MongoDb-upload
How to set up and test APIs to MongoDB

1. Open a terminal, command： mongod. /Users/sibofu/Desktop/MongoDBTest/README.txt
This run a MongoDB in localhost. ctrl + c to kill process

2. Open another terminal, command: mongo. 
This run a MongoDB shell. In shell, you can interact with a mongo database directly.
quit() to kill shell process.
For more MongoDB shell commands, please reference: https://docs.mongodb.com/manual/reference/mongo-shell/

2.a In mongo shell, run: show dbs. To show each db that can be run in localhost.
2.b In mongo shell, run: db. to show which db that is currently running in localhost.

2.c In mongo shell, run: use ActorTest. to switch to ActorTest db that is used for test. 
you can also create a new db for testing, by running: use <non-exsit db name>. And please also update the db name in MongoConn.js file. 

3. Open another terminal, command: node *.js. 
This run a js file. Once you finish #1, the js code can talk to MongoDB directly.

4. Before patching csv file, please change pathToCsv to the path(include name.csv) to read the correct csv.

###########
##How to read patched data in MongoDb
###########
1. In Mongo shell, run： show collections. to check all collections name under the current db.

2. In Mongo shell, run: db.<collection name>.find(), to show all data under the collection.


Code1 folder is ready to upload actor, in code 2,3 folders I were trying to upload more schemas, code2-upload post, code3-upload reply 
Methods I have tried to return result(They did’t work, basically have exception 

1. Using Mongoose Queries
function getQuery(name){
   var query = Jedi.find({name:name});
   return query;
}
var query =  getQuery('Obi-wan');
query.exec(function(err,jedis){
   if(err)
      return console.log(err);
   jedis.forEach(function(jedi){
      console.log(jedi.name);
   });
});
2.  Using Mongoose Promises
function getPromise(name){
   var promise = Jedi.find({name:name}).exec();
   return promise;
}
var promise = get=Promise('Luke');
promise.then(function(jedis){
   jedis.forEach(function(jedi){
      console.log(jedi.name);
   });
}).error(function(error){
   console.log(error);
});
3. Using Mongoose Streams
function getStream(name){
   var stream = Jedi.find({name:name}).stream();
   return stream;
}var stream = get=Stream('Anakin');
stream.on('data', function(jedis){
   jedis.forEach(function(jedi){
      console.log(jedi.name);
   });
});
stream.on('error', function(error){
    console.log(error);
});
