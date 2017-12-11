const parser = function(raw){
	let result = {};
    result['postid'] = parseInt[0];
	result['body'] = raw[1];
	result['actor'] = raw[2];
	result['reply'] = parseInt(raw[3]);
	result['class'] = raw[4];
	
	return result;
}

exports.parser = parser;

