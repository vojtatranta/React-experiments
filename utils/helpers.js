var helpers = {};

helpers.merge = (obj1, obj2) =>
{
	for(var k in obj2)
	{
		obj1[k] = obj2[k];
	}

	return obj1;
};

helpers.compact = () =>
{
    var obj = {};
    Array.prototype.forEach.call(arguments, (elem) => {
        obj[elem] = window[elem];
    });
    return obj;
};

module.exports = helpers;
