/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type: String, default: 'USER', enum:['USER', 'ADMIN', 'CLIENT']}],
    email: String,
    phone: String,
    dateCreated: {type: Date, default: Date.now}
},{collection: "projectuser"});

module.exports = userSchema;