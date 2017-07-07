/**
 * Created by Apoorv on 05-07-2017.
 */

var app = require('../../express');
var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "544", "name": "Post 4", "websiteId": "789", "description": "Lorem" },
];


app.get('/api/assignment/website/:websiteId/page', findPagesByWebsiteId);
app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

function findPagesByWebsiteId(req, res){
    var websiteId = req.params.websiteId;
    var listOfPages = [];

    for (var v in pages) {
        //console.log("wefwfwwr---"+pages[v]);
        if (pages[v].websiteId === websiteId) {
            listOfPages.push(pages[v]);
        }
    }
    res.json(listOfPages);
}

function createPage(req, res){
    var websiteId = req.params.websiteId+"";
    var body = req.body;
    var createId = pages[pages.length -1]._id;
    var newId = parseInt(createId) + 1 + '';
    var page = {"_id": newId, "name": body.name, "websiteId": websiteId, "description": body.description};

    pages.push(page);
    res.json(pages);
}

function findPageById(req, res){

    for(var v in pages) {
        if(pages[v]._id === req.params.pageId){
            res.send(pages[v]);
            return;
        }
    }
    res.sendStatus(404);

    return pages.find(function (page) {
        return page._id === pageId;
    });
}

function updatePage(req, res){
    var body = req.body;

    for(v in pages){
        if(pages[v]._id === req.params.pageId){
            pages[v] = body;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res){
    var pageId = req.params.pageId;

    for (var v in pages) {
        if (pages[v]._id === pageId){
            var index = pages.indexOf(pages[v]);
            pages.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}