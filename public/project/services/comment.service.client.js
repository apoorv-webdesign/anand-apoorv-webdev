/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .factory('commentService', commentService);

    function commentService($http) {
        var api = {
            findCommentByPostId: findCommentByPostId,
            addComment:addComment,
            deleteComment: deleteComment,
            updateComment: updateComment
        };
        return api;

        function findCommentByPostId(postId){
            var url = '/api/project/findPost/'+postId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addComment(comment){
            var url = '/api/project/addComment/';
            return $http
                .post(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteComment(comment){
            var url = '/api/project/deleteComment/'+comment._id;
            return $http
                .get(url)
                .then(function (status) {
                    return status;
                });
        }

        function updateComment(comment){
            var url = '/api/project/updateComment/';
            return $http
                .put(url, comment)
                .then(function (status) {
                    return status;
                });
        }
    }
})();