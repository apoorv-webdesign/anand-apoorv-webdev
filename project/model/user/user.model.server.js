/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('ProjectUserModel', userSchema);

userModel.findUserByCredentials = findUserByCredentials;

module.exports = userModel;


function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});
}