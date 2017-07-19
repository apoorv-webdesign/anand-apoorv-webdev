/**
 * Created by Apoorv on 05-07-2017.
 */

var app = require('../../express');
var pageModel = require('../model/page/page.model.server');


app.get('/api/assignment/website/:websiteId/page', findPagesByWebsiteId);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

function findPagesByWebsiteId(req, res){
    var websiteId = req.params.websiteId;
    var listOfPages = [];

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function(pages){
            res.json(pages);
        });
}

function createPage(req, res){
    var websiteId = req.params.websiteId;
    var page = req.body;
     pageModel
         .createPage(websiteId, page)
         .then(function(page){
             res.json(page);
         });
}

function findPageById(req, res){
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function(page){
            res.json(page);
        });
}

function updatePage(req, res){
    var newPage = req.body;
    var pageId = req.params.pageId;

    pageModel
        .updatePage(pageId, newPage)
        .then(function(status){
            res.send(status);
        })
}

function deletePage(req, res){
    var pageId = req.params.pageId;

    pageModel
        .deletePage(pageId)
        .then(function(status){
            res.send(status);
        });
}