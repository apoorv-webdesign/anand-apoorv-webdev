/**
 * Created by Apoorv on 30-06-2017.
 */

var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var assignmentModel = require('../../assignment/model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;

passport.use('projectLocal',new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/project/user/', findUserByCredentials);
app.post('/api/project/user/register/validation/', registrationValidation);
app.post('/api/project/register/', register);
app.post('/api/project/login/',passport.authenticate('projectLocal'), login);
app.get('/api/project/checkLoggedIn/', checkLoggedIn);
app.post('/api/project/logout/', logout);
app.post('/api/project/allUsers/', findAllUsers);
app.delete('/api/project/deleteUser/:userId', deleteUser);

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if (user && bcrypt.compareSync(password, user.password)){
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}


function findUserByCredentials(req, res) {
    var credential = req.body;
    var username = credential.username;
    var password = credential.password;

    if(username && password){
        userModel
            .findUserByCredentials(username,password)
            .then(function(user){
                if(user){
                    res.json(user);
                }
                else{
                    res.sendStatus(404);
                }
            });
    }
}

function registrationValidation(req, res) {
    var credential = req.body;
    var username = credential.username;
    if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(401);
                }
            });
    }
    else{
        res.sendStatus(401);
    }
}

function login(req, res){
    //console.log(req.user);
    res.json(req.user);
}

function register(req, res){
    var user = req.body;
    user.projectType = "Project";
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function checkLoggedIn(req, res){
    if(req.isAuthenticated()){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
   // console.log(user);
    if (user.projectType === "Project") {
        //console.log(user);
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
    else{
        assignmentModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
}

function logout(req, res){
    req.logout();
    res.sendStatus(200);
}

function findAllUsers(req, res){
    userModel
        .findAllUsers()
        .then(function(users){
            res.json(users);
        })
}

function deleteUser(req, res){
    userId = req.param('userId')
    userModel
        .deleteUser(userId)
        .then(function(status){
            res.send(status);
        })
}