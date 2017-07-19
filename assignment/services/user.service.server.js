/**
 * Created by Apoorv on 30-06-2017.
 */

var app = require('../../express');
var userModel = require('../model/user/user.model.server');

app.get('/api/assignment/user/:userId', findUserById);
app.post('/api/assignment/user/', findAllUsers);
app.post('/api/assignment/createUser/', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

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
        res.json(users);
    }
};
