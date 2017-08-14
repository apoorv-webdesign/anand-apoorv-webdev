(function () {
    angular
        .module('YON')
        .controller('postDetailViewController', postDetailViewController);

    function postDetailViewController(postService, commentService, userService, currentUser, $location, $routeParams) {
        var model = this;
        model.postId = $routeParams['postId'];
        model.user = currentUser;
        model.comment={};
        model.logout=logout;
        model.timeSince = timeSince;
        model.findCommentUser=findCommentUser;
        model.addComment = addComment;
        model.deleteComment = deleteComment;
        model.updateComment= updateComment;
        model.ya = ya;
        model.na = na;

        function init(){
            postService
                .findPostById(model.postId)
                .then(function(post){
                    model.post = post;
                })
            commentService
                .findCommentByPostId(model.postId)
                .then(function(comments){
                    model.comments = comments;

                    // for(var i=0; i<model.comments.length; i++){
                    //     cmnt = model.comments[i];
                    //     userService
                    //         .findUserById(cmnt._user)
                    //         .then(user);
                    //     console.log(user);
                    // }
                })
        }
        init();

        function addComment(cmnt){
            if (typeof cmnt === 'undefined') {
                model.postediterror = 'comment is undefined ';
                return;
            }
            model.comment._user= model.user;
            model.comment._post = model.post;
            console.log(model.comment);
            commentService
                .addComment(model.comment)
                .then(function(status){
                    if(status){
                        model.message = "comment posted";
                        init();
                    }
                });
        }

        function findCommentUser(userId){
            userService
                .findUserById(userId)
                .then(function(user){
                    return user.username;
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteComment(comment){
            commentService
                .deleteComment(comment)
                .then(function(status){
                    init();
                })
        }

        function updateComment(comment){
            commentService
                .updateComment(comment)
                .then(function(status){
                    init();
                })
        }

        function ya(post){
            if(post.ya._user.indexOf(model.user._id)<0) {
                post.ya['count'] += 1;
                post.ya._user = model.user;
                postService
                    .ya(post)
                    .then(function (status) {
                        init();
                    })
            }
        }

        function na(post){
            if(post.na._user.indexOf(model.user._id)<0) {
                post.na['count'] += 1;
                post.na._user = model.user;
                postService
                    .na(post)
                    .then(function (status) {
                        init();
                    })
            }
        }

        function timeSince(tst) {
            var timeStamp = new Date(tst);
            var now = new Date(),
                secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
            if (secondsPast < 60) {
                return timeAgo = parseInt(secondsPast) + 's ago';
            }
            if (secondsPast < 3600) {
                return timeAgo = parseInt(secondsPast / 60) + 'm ago';
            }
            if (secondsPast <= 86400) {
                return timeAgo = parseInt(secondsPast / 3600) + 'h ago';
            }
            if (secondsPast > 86400) {
                day = timeStamp.getDate();
                month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
                year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
                return timeAgo = day + " " + month + year;
            }
        }
    }
})();
