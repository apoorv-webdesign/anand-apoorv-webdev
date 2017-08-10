/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .factory('postService', postService);

    function postService($http) {
        var api = {
            createPost: createPost
        };
        return api;

        function createPost(post){
            var url = '/api/project/createPost/';
            return $http
                .post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();