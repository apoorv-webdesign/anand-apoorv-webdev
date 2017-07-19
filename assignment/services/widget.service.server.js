/**
 * Created by Apoorv on 05-07-2017.
 */

var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgetModel = require('../model/widget/widget.model.server');

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "789", "text": "<p>Lorem ipsum</p>"}
];

app.post("/api/upload", upload.single('myFile'), uploadImage);

app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.post('/api/assignment/page/:pageId+/widget', createWidget);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.put('/api/assignment/page/:pageId/widget', reOrderWidgets)

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;
    console.log(req);
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;
    //var createId = widgets[widgets.length - 1]._id;
    //var widgetid = parseInt(createId) + 1 + '';
    var url = '/assignment/uploads/' + filename;

    return widgetModel
        .findWidgetById(widgetId)
        .then(function(wid){
            var widget = wid;
            widget.width = '100%';
            widget.url = req.protocol + '://' + req.get('host') + url;//'/public/assignment/uploads/' + filename;
        })
        .then(function(){
            widgetModel
            .updateWidget(widgetId,widget)})
        .then(function(){
            var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
            res.redirect(callbackUrl);
        });


    //updateWidget(widgetId,widget);


    var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    //http://localhost:3000/assignment/index.html#!/user/456/website/123/page/544/widget/790

    res.redirect(callbackUrl);
}

// function getWidget(widgetId) {
//     for (var w in widgets) {
//         if (widgets[w]._id === widgetId) {
//             return widgets[w];
//         }
//     }
// }

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets){
           res.json(widgets);
        });

    // for (var v in widgets) {
    //     if (widgets[v].pageId === pageId) {
    //         results.push(widgets[v]);
    //     }
    // }
    // res.json(results);
}

function createWidget(req, res) {
    var widget = req.body;
    //var widgetType = body.widgetType.widgetType;
    console.log(widget);
    var pageId = widget.pageId;

    widgetModel
        .createWidget(pageId, widget)
        .then(function(widget){
            res.json(widget);
        })

    // var createId = widgets[widgets.length - 1]._id;
    // var widgetid = parseInt(createId) + 1 + '';
    // // //console.log(body.widgetType.widgetType);
    // // var widget = {"_id": widgetid, "widgetType": widgetType, "pageId": body.pageId};
    // //
    // // widgets.push(widget);
    // // res.send(widget);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            res.json(widget);
        });

    // for (v in widgets) {
    //     if (widgets[v]._id === widgetId) {
    //         res.json(widgets[v]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updateWidget(req, res) {
    var newWidget = req.body;
    var widgetId = req.params.widgetId;

    widgetModel
        .updateWidget(widgetId, newWidget)
        .then(function(status){
            res.send(status);
        });
    //console.log(widgets);
    // for (v in widgets) {
    //     if (widgets[v]._id === widgetId) {
    //         widgets[v] = body;
    //         res.json(widgets);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(widgetId)
        .then(function(status){
            res.send(status);
        })

    // for (var v in widgets) {
    //     if (widgets[v]._id === widgetId) {
    //         var index = widgets.indexOf(widgets[v]);
    //         widgets.splice(index, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function reOrderWidgets(req, res) {
    // start = req.query.start;
    // end = req.query.final;
    pageId = req.params.pageId;
    // first = 0;
    // last = 0;
    // var temp = {};

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets){
            start = req.query.start;
            end = req.query.final;
            first = 0;
            last = 0;
            var temp = {};
            for (var i in widgets) {
                if (widgets[i].pageId === pageId) {
                    if (parseInt(start) === first) {
                        temp = widgets[i];
                        widgets.splice(i, 1);
                        break;
                    }
                    first++;
                }
            }
            for (var j in widgets) {
                if (widgets[j].pageId === pageId) {
                    if (parseInt(end) === last) {
                        widgets.splice(j, 0, temp);
                        res.json(widgets);
                        return;
                    }
                    last++;
                }
                if (j + 1 === widgets.length) {
                    widgets.push(temp);
                }
            }
        })

    // for (var i in widgets) {
    //     if (widgets[i].pageId === pageId) {
    //         if (parseInt(start) === first) {
    //             temp = widgets[i];
    //             widgets.splice(i, 1);
    //             break;
    //         }
    //         first++;
    //     }
    // }
    // for (var j in widgets) {
    //     if (widgets[j].pageId === pageId) {
    //         if (parseInt(end) === last) {
    //             widgets.splice(j, 0, temp);
    //             res.json(widgets);
    //             return;
    //         }
    //         last++;
    //     }
    //     if (j + 1 === widgets.length) {
    //         widgets.push(temp);
    //     }
    // }
    res.json(widgets);
}