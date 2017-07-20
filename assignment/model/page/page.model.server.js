/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget

module.exports = pageModel;

function findAllPagesForWebsite(websiteId){
    return pageModel
            .find({_website:websiteId});
}

function createPage(websiteId, page){
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function(suc){
            console.log('suc');
        },function(err){
            console.log(err);
        });
}

function findPageById(pageId){
    return pageModel
        .findOne({_id: pageId});
}

function updatePage(pageId, newPage){
    return pageModel
        .update({_id:pageId}, {$set: newPage});
}

function deletePage(pageId){
    return pageModel
        .remove({_id: pageId});
}

function addWidget(pageId, widget) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widget._id);
            page.save();
            return widget;
        });
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}