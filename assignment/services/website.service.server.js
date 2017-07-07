/**
 * Created by Apoorv on 05-07-2017.
 */

var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get('/api/assignment/user/:userId/websites', findAllWebsitesForUser);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req,res) {
    var results = [];

    for (var v in websites) {
        if (websites[v].developerId === req.params.userId) {
            results.push(websites[v]);
        }
    }
    res.json(results);
}

function createWebsite(req, res){
    var body = req.body;
    var createId = websites[websites.length - 1]._id;
    var newId = parseInt(createId) + 1 + '';
    var website = {"_id": newId, "name": body.name, "developerId": body.developerId, "description": body.description};

    websites.push(website);
    res.json(website);
}

function findWebsiteById(req, res){
    var websiteId = req.params.websiteId;

    for (var v in websites) {
        if (websites[v]._id === websiteId) {
            res.json(websites[v]);
        }
    }
}

function updateWebsite(req, res){
    var website = req.body;

    for (var w in websites) {
        if (websites[w]._id === req.param('websiteId')) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res){
    var websiteId = req.params.websiteId;

    for (var w in websites) {
        if (websites[w]._id === websiteId){
            var index = websites.indexOf(websites[w]);
            websites.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}