/**
 * Created by Apoorv on 30-06-2017.
 */

var app = require('../../express');
var postModel = require('../model/post/post.model.server');
// var assignmentModel = require('../../assignment/model/user/user.model.server');
// var passport = require('passport');
// var bcrypt = require("bcrypt-nodejs");
// var LocalStrategy = require('passport-local').Strategy;
//
// passport.use('projectLocal',new LocalStrategy(localStrategy));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

app.post('/api/project/createPost/', createPost);
app.post('/api/project/allPosts/', findAllPostsForUser);
app.put('/api/project/updatePost/:postid', updatePost);
app.get('/api/project/onePost/:postId', findPostById);
app.delete('/api/project/deletePost/:postId', deletePost);
app.get('/api/project/search/:searchText', search);

function createPost(req, res) {
    var post = req.body;

    postModel
        .createPost(post)
        .then(function(status){
            res.send(status);
        })
}

function findAllPostsForUser(req, res){
    var userId = req.body._id;
    postModel
        .findAllPostsForUser(userId)
        .then(function(posts){
            res.json(posts);
        })
}

function updatePost(req, res){
    var post = req.body;
    postModel
        .updatePost(req.params.postid, post)
        .then(function(status){
            res.send(status);
        })
}

function findPostById(req, res){
    var id = req.param('postId');
    postModel
        .findPostById(id)
        .then(function(post){
            res.json(post);
        })
}

function deletePost(req, res){
    var id = req.params.postId
    postModel
        .deletePost(id)
        .then(function(status){
            res.send(status);
        })
}

function search(req, res){
    var text = req.params.searchText;
    postModel
        .search(text)
        .then(function(result){
            console.log(result);
            res.json(result);
        });
}