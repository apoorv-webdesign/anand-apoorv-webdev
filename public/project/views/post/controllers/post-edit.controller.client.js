(function () {
    angular
        .module('YON')
        .controller('postEditController', postEditController);

    function postEditController(mapService, postService, $location, currentUser, $routeParams) {
        var model = this;
        model.postId = $routeParams['postId'];
        model.user = currentUser;
        model.message=false;

        model.updatePost = updatePost;
        model.deletePost = deletePost;

        function init(){
            postService
                .findAllPostsForUser(model.user)
                .then(function(posts){
                    model.posts = posts;
                })

            postService
                .findPostById(model.postId)
                .then(function(post){
                    console.log(post);
                    model.post = post;
                })
        }
        init();

        function updatePost(post){
            if (typeof post.description === 'undefined') {
                model.postediterror = 'post is undefined ';
                return;
            }
            postService
                .updatePost(post._id,post)
                .then(function(status){
                    if(status){
                        $location.url('/user/home');
                    }
                });
        }

        function deletePost(){
            postService
                .deletePost(model.post)
                .then(function(status){
                    if(status){
                        $location.url('/user/home');
                    }
                });
        }
    }
})();
