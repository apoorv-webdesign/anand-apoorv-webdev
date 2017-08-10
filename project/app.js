/**
 * Created by Apoorv on 30-06-2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{
    useMongoClient: true
});
mongoose.Promise = require('q').Promise;

console.log('server at project started!');
require('./services/user.service.server');
require('./services/post.service.server');