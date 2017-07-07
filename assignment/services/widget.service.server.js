/**
 * Created by Apoorv on 05-07-2017.
 */

var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "789", "text": "<p>Lorem ipsum</p>"}
];

app.post("/api/upload", upload.single('myFile'), uploadImage);

app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.post('/api/assignment/page/:pageId+/widget', createWidget);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    widget = {};//getWidgetById(widgetId);
    widget.url = '/public/assignment/uploads' + filename;

    var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "page" + pageId + "widget" + widgetId;
    //http://localhost:3000/assignment/index.html#!/user/456/website/123/page/544/widget/790

    res.redirect(callbackUrl);
}

function findWidgetsByPageId(req, res){
    var results = [];
    //console.log( req.params.pageId);
    for(var v in widgets) {
        if(widgets[v].pageId === req.params.pageId) {
            results.push(widgets[v]);
        }
    }
    res.json(results);
}

function createWidget(req, res){
    var body = req.body;
    createId = widgets[widgets.length -1]._id;
    newId = parseInt(createId) + 1 + '';
    var widget = { "_id": newId, "widgetType": body.widgetType, "pageId": body.pageId};

    widgets.push(widget);
    res.send(newId);
}

function findWidgetById(req, res){
    for(v in widgets){
        if(widgets[v]._id === req.params.widgetId){
            res.json(widgets[v]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res){
    var body = req.body;

    for(v in widgets){
        if(widgets[v].id === req.params.widgetId){
            widgets[v] = body.widget;
            res.json(widgets);
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res){
    var widgetId = req.params.widgetId;

    for (var v in widgets) {
        if (widgets[v]._id === widgetId){
            var index = widgets.indexOf(widgets[v]);
            widgets.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}