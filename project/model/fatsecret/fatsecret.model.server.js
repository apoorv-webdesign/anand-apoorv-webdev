/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
var fatsecretSchema = require('./fatsecret.schema.server');

var fatsecretModel = mongoose.model('FatsecretModel', fatsecretSchema);

fatsecretModel.createFatsecret = createFatsecret;
fatsecretModel.findFatsecretById = findFatsecretById;

module.exports = fatsecretModel;

function createFatsecret(fatsecret){
    return fatsecretModel.create(fatsecret);
}

function findFatsecretById(id){
    console.log(id);
    return fatsecretModel.findOne({food_id: id});
}