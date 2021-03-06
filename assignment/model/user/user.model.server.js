/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;


function findUserByGoogleId(googleId){
    return userModel
        .findOne({'google.id': googleId});
}

function createUser(user){
    user.roles = ['USER'];
    return userModel
        .create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findAllUsers(){
    return userModel.find();
}

function findUserByUsername(username){
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser){
    return userModel
        .update({_id:userId}, {$set: newUser});
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}