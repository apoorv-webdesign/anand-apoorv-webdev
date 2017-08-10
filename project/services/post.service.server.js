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

function createPost(req, res) {
    var post = req.body;

    postModel
        .createPost(post)
        .then(function(status){
            res.send(status);
        })
}