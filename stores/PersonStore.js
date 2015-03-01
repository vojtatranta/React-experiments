var Dispatcher = require('../dispatcher/Dispatcher');
var BaseStore = require('./BaseStore');
var inheritance = require('../utils/inheritance');
var Promise = require('promise');
var all = require('when/keys').all;


var self = null;
var PersonStore = function()
{
	self = this;

	self.persons = [];
	self.selectedPerson = null;

}
inheritance.inherits(PersonStore, BaseStore);

PersonStore.prototype.getInitialData = (models) =>
{
	return all({
		persons: new Promise((fullfill, reject) =>
		{
			models.person.all((err, people) =>
			{
				if (err)
					return reject(err)

				self.persons = people;
				return fullfill(people);
			});
		}),
	});
}

PersonStore.prototype.getAll = () =>
{
	return {persons: self.persons};
};

PersonStore.prototype.getSelected = () =>
{
	return self.selectedPerson;
}

module.exports = new PersonStore();
