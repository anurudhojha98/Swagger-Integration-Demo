var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    city: String,
    company: String
})

module.exports = mongoose.model('User', UserSchema);

