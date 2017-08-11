/**
 * Created by Apoorv on 30-06-2017.
 */

var app = require('../../express');
var commentModel = require('../model/comment/comment.model.server');

app.get('/api/project/findPost/:postId', findCommentByPostId);
app.post('/api/project/addComment/', addComment);

function findCommentByPostId(req, res) {
    var id = req.params.postId;

    commentModel
        .findCommentByPostId(id)
        .then(function(comments){
            res.json(comments);
        })
}

function addComment(req, res) {
    var comment = req.body;

    commentModel
        .addComment(comment)
        .then(function(status){
            res.send(status);
        })
}