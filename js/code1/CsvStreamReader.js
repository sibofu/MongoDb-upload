var fs = require('fs');
var csv = require('fast-csv');
var Parser = require('./Parser');

exports.CsvStreamRead = (ActorModel, pathToCsv) => {
	const actors = [];
	fs.createReadStream(pathToCsv)
		.pipe(csv())
		.on('data', function(data){
			// this function is called for each row in csv.
			const actorJson = Parser.parser(data);
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
