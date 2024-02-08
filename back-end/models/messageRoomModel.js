const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 

const messageRoom = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

});

module.exports = mongoose.model("Room", messageRoom);