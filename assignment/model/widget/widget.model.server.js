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

function createWidget(pageId, widget) {
    widget._page = pageId;
    widget.widgetType = widget.widgetType.widgetType;

    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidget(pageId, widget);
        })
}

function findAllWidgetsForPage(pageId){
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function(page){
            return page.widgets;
        })
}

function findWidgetById(widgetId){
    return widgetModel
        .findOne({_id:widgetId});
}

function updateWidget(widgetId, newWidget){
    return widgetModel
        .update({_id:widgetId}, {$set: newWidget});
}

function deleteWidget(pageId, widgetId){
    return widgetModel
        .remove({_id: widgetId})
        .then(function(status){
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

function reorderWidget(pageId, start, end){
    return pageModel
        .findPageById(pageId)
        .then(function(page){
            var widgets = page.widgets;
            var widget = widgets[start];
            widgets.splice(start, 1);
            widgets.splice(end, 0, widget);
            return page.save();
        })
}