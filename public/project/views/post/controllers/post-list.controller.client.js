/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .controller('postListController', postListController);

    function postListController($location, postService, currentUser) {
        var model = this;

        model.user = currentUser;

        function init(){
            postService
                .findAllPostsForUser(model.user)
                .then(function(data){
                    console.log(data);
                    model.posts = data;
                })
        }
        init();
    }
})();
