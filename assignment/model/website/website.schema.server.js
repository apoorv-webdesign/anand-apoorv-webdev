/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}],
    dateCreated: {type: Date, default: Date.now}},
    {collection: "website"});

module.exports = websiteSchema;