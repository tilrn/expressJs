var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
	'message': String,
	'userId': String,
	'questionId': String
});



module.exports = mongoose.model('comments', commentsSchema);


