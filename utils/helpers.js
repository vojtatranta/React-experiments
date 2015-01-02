var helpers = {};

helpers.merge = function(obj1, obj2)
{
	for(var k in obj2)
	{
		obj1[k] = obj2[k];
	}

	return obj1;
}

module.exports = helpers;