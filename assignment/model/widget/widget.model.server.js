/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');

var widgetModel = mongoose.model('WidgetModel', widgetSchema);

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
    return widgetModel
        .create(widget);
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page: pageId});
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
    return widgetModel
        .remove({_id: widgetId});
}

function reorderWidget(pageId, start, end){

}