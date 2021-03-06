/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    description: String,
    username: String,
    location: String,
    _user:{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    ya:{
        count: {type: Number, default: 0},
        _user: [{type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"}]
    },
    na:{
        count: {type: Number, default: 0},
        _user: [{type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"}]
    },
    _fatsecret: {type: mongoose.Schema.ObjectId, ref: "FatsecretModel"},
    dateCreated: {type: Date, default: Date.now}
},{collection: "post"});

//postSchema.index( {description: "text", location:"text"} );
postSchema.index( {"$**" :"text"} );

module.exports = postSchema;