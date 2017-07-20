/**
 * Created by Apoorv on 05-07-2017.
 */

var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgetModel = require('../model/widget/widget.model.server');

app.post("/api/upload", upload.single('myFile'), uploadImage);
app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.post('/api/assignment/page/:pageId+/widget', createWidget);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);
app.put('/api/assignment/page/:pageId/widget', reOrderWidgets)

function uploadImage(req, res) {

    var pageId = req.body.pageId;
    var widgetId = req.body.widgetId;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;

    var width = req.body.width;
    //var name = req.body.name;
    //var text = req.body.text;
    var myFile = req.file;
    var filename = myFile.filename;
    var localUrl = '/assignment/uploads/' + filename;

    var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){

            widget.width = width
            widget.url = req.protocol + '://' + req.get('host') + localUrl;
            widgetModel
                .updateWidget(widget._id, widget)
                .then(function(status){
                    res.redirect(callbackUrl);
                })
        });
}


function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets){
           res.json(widgets);
        });
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = widget.pageId;

    widgetModel
        .createWidget(pageId, widget)
        .then(function(widget){
            res.json(widget);
        })
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            res.json(widget);
        });
}

function updateWidget(req, res) {
    var newWidget = req.body;
    var widgetId = req.params.widgetId;

    widgetModel
        .updateWidget(widgetId, newWidget)
        .then(function(status){
            res.send(status);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    console.log(pageId);

    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function(status){
            console.log(status);
            res.send(status);
        }, function(err){
            console.log(err);
        })
}

function reOrderWidgets(req, res) {
    start = req.query.initial;
    end = req.query.final;
    pageId = req.params.pageId;

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (status) {
            res.send(status);
        })
}