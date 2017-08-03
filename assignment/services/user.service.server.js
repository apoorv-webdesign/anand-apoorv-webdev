/**
 * Created by Apoorv on 30-06-2017.
 */

var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");


// GOOGLE_CLIENT_ID = '596822831284-jgt2rd2n569t9h90sbqkod5sj7k6iv50.apps.googleusercontent.com';
// GOOGLE_CLIENT_SECRET = 'JEyyXbAR6SmMfqFbcn59OWse';
// GOOGLE_CALLBACK_URL = 'http://127.0.0.1:3000/auth/google/callback';

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
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: 'http://127.0.0.1:3000/assignment/index.html#!/login'
    }));

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/assignment/user/:userId', findUserById);
app.post('/api/assignment/user/', isAdmin, findAllUsers);
app.post('/api/assignment/createUser/', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId',isAdmin, deleteUser);
app.delete('/api/assignment/unregister/', unRegister);

app.post('/api/assignment/login',passport.authenticate('local'), login);
app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
app.get('/api/assignment/checkAdmin', checkAdmin);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);

app.get('/auth/google', passport.authenticate('google', { scope :['profile','email']}));


function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                //if(user.username === username && user.password === password) {
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

function checkLoggedIn(req, res){
    if(req.isAuthenticated()){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}

function checkAdmin(req, res){
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') >-1){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}

function login(req, res){
    // var user = req.user;
    // if(user && bcrypt.compareSync(password, user.password)) {
    //     console.log(user)
    //     return done(null, user);
    // } else {
    //     return done(null, false);
    //     console.log('false')
    // }
    res.json(req.user);
}

function logout(req, res){
    req.logout();
    res.sendStatus(200);
}

function deleteUser(req, res){
    var userId = req.param('userId');
    userModel
        .deleteUser(userId)
        .then(function(status){
            res.send(status);
        });
}

function updateUser(req, res){
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function(status){
            res.send(status);
        });
}

function createUser(req, res){
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (doc) {
            res.json(user);
        });
};

function findUserById(req, res) {
    var userId = req.param('userId');
    userModel
        .findUserById(userId)
        .then(function(user){
            res.json(user);
        });
};

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1){
        next();
    }
    else{
        res.sendStatus(401);
    }
}

function findAllUsers(req, res) {
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
    else if(username){

        userModel
            .findUserByUsername(username)
            .then(function(user){
                if(user){
                    res.json(user);
                }
                else{
                    res.sendStatus(404);
                }
            });
    }
    else{
        userModel
            .findAllUsers()
            .then(function(users){
                res.json(users);
        })
    }
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function register(req, res){
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function(status){
                res.json(user);
            });
        });
}

function unRegister(req ,res){
    var userId = req.user._id;
    console.log(userId);
    userModel
        .deleteUser(userId)
        .then(function(status){
            req.logout();
            res.sendStatus(200);
        });
}
