const mongoose = require("mongoose");

const intentSchema = mongoose.Schema({
    request:{
        type:String,
        required:true
    },
    response:{
        type:String,
        required:true
    }
})

exports.Intent = mongoose.model('Intent', intentSchema, 'intent')