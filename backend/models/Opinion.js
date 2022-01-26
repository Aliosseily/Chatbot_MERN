const mongoose = require('mongoose');

const opinionSchema =  mongoose.Schema({
    name: String,
    opinion: String,
    email: String,
    registerDate: Date
});

exports.Opinion = mongoose.model('Opinion', opinionSchema);


