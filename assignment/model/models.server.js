/**
 * Created by Apoorv on 13-07-2017.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = require('q').Promise;

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: Date,
    thumbsUp: Number
}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);

function findAllBlogPosts() {
    return blogModel.find(function(err, docs){
        console.log(docs);
    });
}

function createBlogPost(blogPost) {
    return blogModel
        .create(blogPost)
        .then(function (doc) {
            console.log(doc);
        }, function err(err) {
            console.log(err);
        });
}

// createBlogPost({
//     title: "post 321",
//     body: "body 321",
//     postDate: new Date(),
//     thumbsUp: 321
// });

findAllBlogPosts()
    .then(function(posts){
        console.log(posts);
    });
