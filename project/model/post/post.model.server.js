/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');

var postModel = mongoose.model('PostModel', postSchema);

postModel.createPost = createPost;
postModel.findAllPostsForUser = findAllPostsForUser;
postModel.updatePost = updatePost;
postModel.findPostById = findPostById;
postModel.deletePost = deletePost;
postModel.search = search;
// postModel.deleteUser = deleteUser;

module.exports = postModel;

function createPost(post){
    return postModel.create(post);
}

function findAllPostsForUser(userId){
    return postModel.find({_user: userId});
}

function updatePost(postid, post){
    return postModel
        .update({_id:postid}, {$set: post});
}

function findPostById(id){
    return postModel
        .findOne({_id:id});
}

function deletePost(id){
    return postModel
        .remove({_id:id});
}

function search(txt){
    //postModel.index( {description: "text", location:"text"} );

    return postModel
        .find( { $text: { $search: txt } } );
        //.find({$or: [{$text1: { $search: txt } }, {$text2: { $search: txt }}]});

    // postModel
    //     .ensureIndex([{description:"text"}, {location:"text"}]);

    // return postModel
    //     .find(({$text:{$search:text}}));
    // return postModel
    //     .find({$or: [{description:  text}, {location: text}]});

    // return postModel
    //     .find({ $search:text });
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