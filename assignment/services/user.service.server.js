/**
 * Created by Apoorv on 30-06-2017.
 */

var app = require('../../express');

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.get('/api/assignment/user/:userId', findUserById);
app.post('/api/assignment/user/', findAllUsers);
app.post('/api/assignment/createUser/', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

function deleteUser(req, res){
    var user = req.body;
    for(var v in users){
        if(users[v]._id === req.param('userId')){
            users.splice(v,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateUser(req, res){
    var user = req.body;
    for(var v in users){
        //console.log(req.param('userId'));
       if(users[v]._id === req.param('userId')){
          users[v] = user;
          res.sendStatus(200);
          return;
       }
    }
    res.sendStatus(404);
}

function createUser(req, res){
    var user = req.body;
    user._id = (new Date()).getTime()+'';
    users.push(user);
    res.json(user);
};

function findUserById(req, res) {
    for(var u in users) {
        if(users[u]._id === req.param('userId')){//userId) {
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);//.send{message:'User Id '};
};

function findAllUsers(req, res) {
    var credential = req.body;
    var username = credential.username;
    var password = credential.password;

    if(username && password){
        for(var u in users) {
            var user = users[u];
            if( user.username === username &&
            user.password === password) {
            res.json(user);
            //console.log(user);
            return;
            }
         }
        res.sendStatus(404);
        return
    }
    else if(username){
        //console.log(username)
        for(var u in users) {
            var user = users[u];
            //console.log(user)
            if( user.username === username) {
                //console.log(user)
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return;
    }
    else{
        res.json(users);
    }
};
