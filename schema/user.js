
var mongoose = require('mongoose');



var Schema = mongoose.Schema,

ObjectId = Schema.ObjectId;

var myuser = new Schema({
user_name :String,
user_email :String,
user_mobile :String
});

module.exports = mongoose.model('users', myuser);