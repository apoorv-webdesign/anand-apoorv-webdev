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

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    console.log(profile);
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#!/profile',
        failureRedirect: '/#!/login'
    }));

app.get('/auth/google/', passport.authenticate('google', { scope :['profile','email']}));
app.post('/api/project/user/', findUserByCredentials);
app.post('/api/project/user/register/validation/', registrationValidation);
app.post('/api/project/register/', register);
app.post('/api/project/login/',passport.authenticate('projectLocal'), login);
app.get('/api/project/checkLoggedIn/', checkLoggedIn);
app.post('/api/project/logout/', logout);
app.post('/api/project/allUsers/', findAllUsers);
app.delete('/api/project/deleteUser/:userId', deleteUser);
app.get('/api/project/user/search/:searchText', search);
app.post('/api/project/user/follow/', addFollow);
app.post('/api/project/user/unfollow/', deleteFollow);
app.put('/api/project/updateUser/', updateUser);
app.get('/api/project/checkAdmin', checkAdmin);
app.post('/api/project/allFollows/', findAllFollows);
app.delete('/api/project/unregister/:userId', unRegister);

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

function search(req, res){
    var text = req.params.searchText;
    userModel
        .search(text)
        .then(function(result){
            console.log(result);
            res.json(result);
        });
}

function addFollow(req, res){
    var user = req.body;
    userModel
        .addFollow(user.currentUser, user.followedUser)
        .then(function(status){
            if(status){
                userModel.addFollower(user.followedUser, user.currentUser)
                .then(function(status){
                    res.send(status);
                })
            }
        })
}

function deleteFollow(req, res){
    var user = req.body;
    userModel
        .deleteFollow(user.currentUser, user.followedUser)
        .then(function(status){
            if(status){
                userModel.deleteFollower(user.followedUser, user.currentUser)
                    .then(function(status){
                        res.send(status);
                    })
            }
        })
}

function updateUser(req, res){
    user = req.body;
    userModel
        .updateUser(user)
        .then(function(status){
            res.send(status);
        })
}

function checkAdmin(req, res){
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') >-1){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}

function findAllFollows(req, res){
    var user = req.body;
    userModel
        .findAllFollows(user)
        .then(function(data){
            if(data){
                res.json(data);
            }
        });
}

function unRegister(req, res){
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function(status){
            res.send(status);
        })
}