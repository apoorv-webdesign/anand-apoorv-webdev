/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');

var widgetModel = mongoose.model('WidgetModel', widgetSchema);

var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

    module.exports = widgetModel;

function createWidget(pageId, widget){
    widget._page = pageId;
    widget.widgetType = widget.widgetType.widgetType;
    //var noOfWidgets =0;

    return widgetModel
        .find({_page:pageId})
        .then(function(widgets){
            noOfWidgets = widgets.length;
            widget.index = noOfWidgets;

            return widgetModel
                .create(widget)
    })

    // return widgetModel
    //     .create(widget);
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page: pageId})
        .sort({index:1});
}

function findWidgetById(widgetId){
    return widgetModel
        .findOne({_id:widgetId});
}

function updateWidget(widgetId, newWidget){
    return widgetModel
        .update({_id:widgetId}, {$set: newWidget});
}

function deleteWidget(widgetId){
    // var idx=0;
    // return widgetModel
    //     .findOne({_id:widgetId})
    //     .then(function(widget){
    //         idx = widget.index;
    //         widgetModel
    //             .find()
    //             .then(function(widgets){
    //                 widgets.forEach(function(widget){
    //                     if(widget.index> idx){
    //                         widget.index = widget.index -1;
    //                     }
    //                 })
    //             })
    //             .then(function(){
    //                 return widgetModel
    //                     .remove({_id: widgetId});
    //             });
    //     });

    return widgetModel
        .remove({_id: widgetId});
}

function reorderWidget(pageId, start, end){

    return pageModel
        .findById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var widget = widgets[start];
            widgets.splice(start, 1);
            widgets.splice(end, 0, widget);
            var count=0;
            console.log(count);
            widgets.forEach(function(widget){
                widget.index = count;
                console.log(count);
                widget.save();
                // widgetModel
                //     .updateWidget(widget._id, widget)
                //     .then(function(status){})
                count++;
            })
            console.log(2);
            // return pageModel
            //     .update(pageId, {$set: page});
            return page.save();
        });
}