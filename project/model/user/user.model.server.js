/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('ProjectUserModel', userSchema);

userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.deleteUser = deleteUser;

module.exports = userModel;


function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username){
    return userModel.findOne({username: username});
}

function createUser(user){
    return userModel.create(user);
}

function findUserById(id){
    return userModel.findById(id);
}

function findAllUsers(){
    return userModel.find();
}

function deleteUser(userId){
    return userModel.remove({_id: userId})
    //return userModel.remove({_id:userId});
}