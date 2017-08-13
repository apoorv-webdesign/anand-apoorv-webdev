/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .factory('postService', postService);

    function postService($http) {
        var api = {
            createPost: createPost,
            findAllPostsForUser: findAllPostsForUser,
            updatePost: updatePost,
            findPostById: findPostById,
            deletePost: deletePost,
            search: search,
            findAllFollowPosts: findAllFollowPosts,
            ya: ya,
            na: na
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

        function findAllPostsForUser(user){
            var url = '/api/project/allPosts/';
            return $http
                .post(url, user)
                .then(function(response){
                    return response.data;
                })
        }

        function findPostById(postId){
            var url = '/api/project/onePost/'+postId;
            return $http
                .get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function updatePost(postId, post){
            var url= '/api/project/updatePost/'+postId;

            return $http.put(url, post)
                .then(function (response) {
                    return response;
                });
        }

        function deletePost(post){
            var url= '/api/project/deletePost/'+post._id;

            return $http.delete(url, post)
                .then(function (response) {
                    return response;
                });
        }

        function search(searchText){
            var url = '/api/project/search/'+searchText;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function findAllFollowPosts(user){
            var url= '/api/project/findAllFollowPosts/';
            return $http.post(url, user)
                .then(function(response){
                    return response.data;
                })
        }

        function ya(post){
            var url=  '/api/project/ya/'+post._id;
            return $http.put(url, post)
                .then(function(response){
                    return response.data;
                })
        }

        function na(post){
            var url=  '/api/project/na/'+post._id;
            return $http.put(url,post)
                .then(function(response){
                    return response.data;
                })
        }
    }
})();