/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
        _page:{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"},
        widgetType: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        index: Number,
        dateCreated: {type: Date, default: Date.now}},
    {collection: "widget"});

module.exports = widgetSchema;
