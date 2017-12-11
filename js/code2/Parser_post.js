const parser = function(raw){
	let result = {};
	result['id'] = raw[0];
	result['body'] = raw[1];
	result['picture'] = parseInt(raw[2]);
	result['actor'] = raw[3];
	result['time'] = raw[4];
	result['class'] = raw[5];
	
	return result;
}

exports.parser = parser;

