/**
 * Created by Apoorv on 13-07-2017.
 */
var mongoose = require('mongoose');

var fatsecretSchema = mongoose.Schema({
    brand_name: String,
    food_description: String,
    food_id: {type: String, unique: true},
    food_name: String,
    food_type: String,
    food_url: String,
    ya:{
        count: {type: Number, default: 0},
        _user: [{type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"}]
    },
    na:{
        count: {type: Number, default: 0},
        _user: [{type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"}]
    },
    dateCreated: {type: Date, default: Date.now}
},{collection: "fatsecret"});

module.exports = fatsecretSchema;