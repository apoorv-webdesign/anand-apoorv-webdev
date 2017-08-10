/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');

var postModel = mongoose.model('PostModel', postSchema);

postModel.createPost = createPost;
// postModel.findUserByUsername = findUserByUsername;
// postModel.createUser = createUser;
// postModel.findUserById = findUserById;
// postModel.findAllUsers = findAllUsers;
// postModel.deleteUser = deleteUser;

module.exports = postModel;


function createPost(post){
    return postModel.create(post);
}

// function findUserByUsername(username){
//     return userModel.findOne({username: username});
// }
//
// function createUser(user){
//     return userModel.create(user);
// }
//
// function findUserById(id){
//     return userModel.findById(id);
// }
//
// function findAllUsers(){
//     return userModel.find();
// }
//
// function deleteUser(userId){
//     return userModel.remove({_id: userId})
//     //return userModel.remove({_id:userId});
// }