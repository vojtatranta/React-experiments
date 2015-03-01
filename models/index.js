var helpers = require('../utils/helpers');
var orm = require('orm');


var models = {};

module.exports = function(db)
{
    var Person = models.person = db.define("person", {
            name      : String,
            surname   : String,
            age       : Number, // FLOAT 
            male      : Boolean,
            continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type 
            photo     : Buffer, // BLOB/BINARY 
            data      : Object // JSON encoded 
            }, {
                methods: {
                    fullName: function () {
                        return this.name + ' ' + this.surname;
                    }
                },
                validations: {
                    age: orm.enforce.ranges.number(18, "under-age")
                }
            });

    
    var Article = models.article = db.define('article', {

        title: String,
        text: {type: 'text'},
    });
    Article.hasOne('author', Person);


    return models;


}

