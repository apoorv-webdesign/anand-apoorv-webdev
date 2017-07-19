/**
 * Created by Apoorv on 05-07-2017.
 */

var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

app.get('/api/assignment/user/:userId/websites', findAllWebsitesForUser);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req,res) {

    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function(websites){
            res.json(websites);
        });
}

function createWebsite(req, res){
    websiteModel
        .createWebsite(req.param('userId'), req.body)
        .then(function(status){
            res.send(status);
        });
}

function findWebsiteById(req, res){
    var websiteId = req.params.websiteId;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function(website){
            res.json(website);
        })
}

function updateWebsite(req, res){
    var website = req.body;
    websiteModel
        .updateWebsite(req.param('websiteId'), website)
        .then(function(status){
            res.send(status);
        })
}

function deleteWebsite(req, res){
    var websiteId = req.params.websiteId;

    websiteModel
        .deleteWebsite(websiteId)
        .then(function(status){
            res.send(status);
        })
}