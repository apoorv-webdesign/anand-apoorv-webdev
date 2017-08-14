/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    google:{
        id: String,
        token: String
    },
    roles: [{type: String, default: 'USER', enum:['USER', 'ADMIN', 'RESTAURANT']}],
    email: String,
    phone: String,
    projectType: String,
    follow: [{type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"}],
    followers: [{type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"}],
    dateCreated: {type: Date, default: Date.now}
},{collection: "projectuser"});

userSchema.index( {username: "text", firstName: "text", lastName: "text", email: "text" } );

module.exports = userSchema;