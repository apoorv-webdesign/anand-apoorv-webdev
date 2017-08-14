/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var fatsecretSchema = require('./fatsecret.schema.server');

var fatsecretModel = mongoose.model('FatsecretModel', fatsecretSchema);

fatsecretModel.createFatsecret = createFatsecret;
// postModel.findAllPostsForUser = findAllPostsForUser;
// postModel.updatePost = updatePost;
// postModel.findPostById = findPostById;
// postModel.deletePost = deletePost;
// postModel.search = search;
// postModel.findAllFollowPosts = findAllFollowPosts;

module.exports = fatsecretModel;

function createFatsecret(fatsecret){
    return fatsecretModel.create(fatsecret);
}