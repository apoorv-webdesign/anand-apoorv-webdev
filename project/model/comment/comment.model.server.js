/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');

var commentModel = mongoose.model('CommentModel', commentSchema);

commentModel.findCommentByPostId = findCommentByPostId;
commentModel.addComment = addComment;
commentModel.deleteComment = deleteComment;
commentModel.updateComment = updateComment;

module.exports = commentModel;

function addComment(comment){
    return commentModel.create(comment);
}

function findCommentByPostId(postId){
    return commentModel.find({_post:postId});
}

function deleteComment(commentId){
    return commentModel.remove({_id:commentId});
}

function updateComment(comment){
    return commentModel.set({_id: comment._id}, {$set: comment});
}