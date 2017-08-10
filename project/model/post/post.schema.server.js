/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    description: String,
    location: String,
    _user:{type: mongoose.Schema.Types.ObjectId, ref: "PostModel"},
    dateCreated: {type: Date, default: Date.now}
},{collection: "post"});

module.exports = postSchema;