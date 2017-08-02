/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .factory('userService', userService);

    function userService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials
        };
        return api;

        function findUserByCredentials(username, password) {
            var url = '/api/assignment/user/';
            var credential = {username: username, password: password};

            return $http
                .post(url, credential)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();