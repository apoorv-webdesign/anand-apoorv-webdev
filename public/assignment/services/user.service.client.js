/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function updateUser(userId, user) {
            var url = '/api/assignment/user/' + userId;
            return $http
                .put(url, user)
                .then(function (response) {
                    return response;
                });
        }

        function deleteUser(userId) {
            console.log(userId);
            var url = '/api/assignment/user/' + userId;
            return $http
                .delete(url)
                .then(function (response) {
                    console.log(response);
                    return response;
                });
        }

        function createUser(user) {
            var url = '/api/assignment/createUser/';
            return $http.post(url, user)
                .then(function (response) {
                    //console.log(response.data);
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = '/api/assignment/user/';
            var credential = {username: username};

            return $http
                .post(url, credential)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

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