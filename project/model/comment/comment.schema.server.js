/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    content: String,
    like: String,
    _user:{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _post:{type: mongoose.Schema.Types.ObjectId, ref: "PostModel"},
    dateCreated: {type: Date, default: Date.now}
},{collection: "comment"});

commentSchema.index( {"$**" :"text"} );

module.exports = commentSchema;