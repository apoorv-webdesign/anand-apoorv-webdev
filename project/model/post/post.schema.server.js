/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    description: String,
    location: String,
    _user:{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    dateCreated: {type: Date, default: Date.now}
},{collection: "post"});

//postSchema.index( {description: "text", location:"text"} );
postSchema.index( {"$**" :"text"} );

module.exports = postSchema;