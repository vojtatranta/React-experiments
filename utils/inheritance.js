/**
* Function allowing inheritance
* @author Daniel Steigerwald
**/

var inheritance = {};

inheritance.inherits = function(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    for (var k in parent)
    {
    	child[k] = parent[k];
    }
    child._superClass = parent.prototype;

    child.prototype.constructor = child;
};

inheritance._super = function(klass, inst, method, args)
{
	return klass._superClass[method].apply(inst, args);
}

module.exports = inheritance;

/*
* Calling
* 
* inherits(Employee, Person);
*
*/