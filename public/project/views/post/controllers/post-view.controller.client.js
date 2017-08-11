(function () {
    angular
        .module('YON')
        .controller('postViewController', postViewController);

    function postViewController(postService, commentService, userService, currentUser, $location, $routeParams) {
        var model = this;
        model.postId = $routeParams['postId'];
        model.user = currentUser;
        model.comment={};
        model.message=false;

        model.addComment = addComment;

        function init(){
            postService
                .findPostById(model.postId)
                .then(function(post){
                    model.post = post;
                })
            commentService
                .findCommentByPostId(model.postId)
                .then(function(comments){
                    console.log(comments);
                    model.comments = comments;
                })
        }
        init();

        function addComment(cmnt){
            if (typeof cmnt === 'undefined') {
                model.postediterror = 'comment is undefined ';
                return;
            }
            model.comment.user= model.user._id;
            model.comment.post = model.postId;
            console.log(model.comment);
            commentService
                .addComment(model.comment)
                .then(function(status){
                    if(status){
                        model.message = "comment posted";
                    }
                });
        }
        // function checkLoggedIn($q, $location){
        //     var deferred = $q.defer();
        //     userService
        //         .checkLoggedIn()
        //         .then(function(currentUser){
        //             if(currentUser === '0'){
        //                 deferred.reject();
        //                 $location.url('/login');
        //             }
        //             else{
        //                 deferred.resolve(currentUser);
        //             }
        //         })
        //     return deferred.promise;
        // }
    }
})();
