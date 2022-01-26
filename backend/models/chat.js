const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    who: {
        type: String,
    },
    content: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
});

exports.Chat = mongoose.model('Chat', chatSchema);
