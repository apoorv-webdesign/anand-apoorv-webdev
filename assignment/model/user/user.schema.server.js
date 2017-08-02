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
    roles: [{type: String, default: 'USER', enum:['USER', 'ADMIN', 'STUDENT']}],
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
},{collection: "user"});

module.exports = userSchema;