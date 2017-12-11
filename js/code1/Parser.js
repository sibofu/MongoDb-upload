const parser = function(raw){
	let result = {};
	result['username'] = raw[0];
	result['name'] = raw[1];
	result['age'] = parseInt(raw[2]);
	result['picture'] = raw[3];
	result['gender'] = raw[4];
	result['bio'] = raw[5];
	result['location'] = raw[6];
	result['class'] = raw[7];
	return result;
}

exports.parser = parser;

