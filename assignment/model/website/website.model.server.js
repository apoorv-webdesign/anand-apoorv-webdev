/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');

var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function findAllWebsitesForUser(userId){
    return websiteModel
        .find({_user:userId});
}

function createWebsite(userId, website){
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function(suc){
            console.log('suc');
        },function(err){
            console.log(err);
        });
}

function findWebsiteById(websiteId){
    return websiteModel
        .findOne({_id:websiteId});
}

function updateWebsite(websiteId, newWebsite){
    return websiteModel
        .update({_id:websiteId}, {$set: newWebsite});
}

function deleteWebsite(websiteId){
    return websiteModel
        .remove({_id:websiteId});
}
