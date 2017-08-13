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
userModel.search = search;
userModel.addFollow = addFollow;
userModel.addFollower = addFollower;
userModel.deleteFollow = deleteFollow;
userModel.deleteFollower = deleteFollower;
userModel.updateUser = updateUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findAllFollows = findAllFollows;

module.exports = userModel;


function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(id) {
    return userModel.findById(id);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({_id: userId})
}

function search(txt) {
    return userModel
        .find({$text: {$search: txt}});
}

function addFollow(currentUser, followedUser) {
    return userModel
        .findUserById(currentUser._id)
        .then(function (user) {
            var follow = user.follow;
            follow.push(followedUser);
            return user.save();
        })
}

function addFollow(currentUser, followedUser) {
    return userModel
        .findUserById(currentUser._id)
        .then(function (user) {
            var follow = user.follow;
            follow.push(followedUser);
            return user.save();
        })
}

function addFollower(followedUser, currentUser) {
    return userModel
        .findUserById(followedUser._id)
        .then(function (user) {
            var followers = user.followers;
            followers.push(currentUser);
            return user.save();
        })
}

function deleteFollow(currentUser, followedUser) {
    return userModel
        .findUserById(currentUser._id)
        .then(function (user) {
            var follow = user.follow;
            follow.pop(followedUser);
            return user.save();
        })
}

function deleteFollower(followedUser, currentUser) {
    return userModel
        .findUserById(followedUser._id)
        .then(function (user) {
            var followers = user.followers;
            followers.pop(currentUser);
            return user.save();
        })
}

function updateUser(user) {
    return userModel
        .update({_id: user._id}, {$set: user});
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}

function findAllFollows(user) {
    return userModel
        .findOne({_id: user._id})
        .then(function (user) {
            if (user) {
                return userModel.find({_id:{ $in : user.follow}});
            }
        })
}