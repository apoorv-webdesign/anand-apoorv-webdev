/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');

var commentModel = mongoose.model('CommentModel', commentSchema);

commentModel.findCommentByPostId = findCommentByPostId;
commentModel.addComment = addComment;
// postModel.updatePost = updatePost;
// postModel.findPostById = findPostById;
// postModel.deletePost = deletePost;
// postModel.search = search;
// postModel.deleteUser = deleteUser;

module.exports = commentModel;

function addComment(comment){
    return commentModel.create(comment);
}

function findCommentByPostId(postId){
    return commentModel.find({_post:postId});
}

// function createPost(post){
//     return postModel.create(post);
// }
//
// function findAllPostsForUser(userId){
//     return postModel.find({_user: userId});
// }
//
// function updatePost(postid, post){
//     return postModel
//         .update({_id:postid}, {$set: post});
// }
//
// function findPostById(id){
//     return postModel
//         .findOne({_id:id});
// }
//
// function deletePost(id){
//     return postModel
//         .remove({_id:id});
// }
//
// function search(txt){
//     //postModel.index( {description: "text", location:"text"} );
//
//     return postModel
//         .find( { $text: { $search: txt } } );
//         //.find({$or: [{$text1: { $search: txt } }, {$text2: { $search: txt }}]});
//
//     // postModel
//     //     .ensureIndex([{description:"text"}, {location:"text"}]);
//
//     // return postModel
//     //     .find(({$text:{$search:text}}));
//     // return postModel
//     //     .find({$or: [{description:  text}, {location: text}]});
//
//     // return postModel
//     //     .find({ $search:text });
// }
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