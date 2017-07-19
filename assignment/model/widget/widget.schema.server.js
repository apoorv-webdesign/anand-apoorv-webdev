/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
        _page:{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"},
        type: String,
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

        widgets: [{type: mongoose.Schema.ObjectId, ref: "WidgetModel"}],
        dateCreated: {type: Date, default: Date.now}},
    {collection: "page"});

module.exports = pageSchema;
