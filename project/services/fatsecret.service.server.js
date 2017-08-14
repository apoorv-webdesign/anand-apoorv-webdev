/**
 * Created by Apoorv on 30-06-2017.
 */

// const FatSecret = require('..');
// const fatAPI = new FatSecret(process.env.FS_KEY, process.env.FS_SECRET);
//
// console.json = function(obj) {
//     console.log(JSON.stringify(obj, null, 2));
// };
//
// module.exports = fatAPI;

var app = require('../../express');
var fatsecretModel = require('../model/fatsecret/fatsecret.model.server');
const fatAPI = require('../fatsecret/examples/fatAPI');

app.get('/api/project/fat/:searchText', search);
app.post('/api/project/createFatsecret/', createFatsecret);
app.get('/api/project/findFatsecretById/:id', findFatsecretById);
app.get('/api/project/searchById/:id',searchById);

function search(req, res){
    var searchText = req.params.searchText;
     fatAPI
        .method('foods.search', {
            search_expression: searchText,
            max_results: 10
        })
        .then(function(results) {
            res.json(results.foods.food);
        });
}
function searchById(req, res) {
    var searchText = req.params.id;
    fatAPI
        .method('food.get', {
            food_id: searchText
        })
        .then(function (food) {
            console.json(food);
        });
}

function createFatsecret(req, res){
    fatsecretModel
        .createFatsecret(req.body)
        .then(function(status){
            res.send(status);
        })
}

function findFatsecretById(req, res){
    var id = req.params.id;
    fatsecretModel
        .findFatsecretById(req.body)
        .then(function(status){
            res.send(status);
        })
}