/**
 * Created by Apoorv on 30-06-2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{
    useMongoClient: true
});
mongoose.Promise = require('q').Promise;

console.log('server started!');
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
require('./services/page.service.server');

//require('./model/user/user.model.server');