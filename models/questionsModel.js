var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
	'question': String,
	'userId': String
});



module.exports = mongoose.model('questions', questionsSchema);


