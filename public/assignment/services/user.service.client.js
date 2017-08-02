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
            findAllUsers: findAllUsers,
            register: register,
            login: login,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout: logout,
            unRegister: unRegister
        };
        return api;

        function checkLoggedIn(){
            var url = '/api/assignment/checkLoggedIn';
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function checkAdmin(){
            var url = '/api/assignment/checkAdmin';
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function login(username, password){
            var url = '/api/assignment/login';
            var credential = {username: username, password: password};
            return $http
                .post(url, credential)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = '/api/assignment/user/' + userId;
            return $http
                .put(url, user)
                .then(function (response) {
                    return response;
                });
        }

        function deleteUser(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function unRegister() {
            var url = '/api/assignment/unregister/';
            return $http
                .delete(url)
                .then(function (response) {
                    return response;
                }, function(err){
                    console.log(err);
                });
        }

        function createUser(user) {
            var url = '/api/assignment/createUser/';
            return $http.post(url, user)
                .then(function (response) {
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

        function findAllUsers(username, password) {
            var url = '/api/assignment/user/';

            return $http
                .post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout(){
            var url = '/api/assignment/logout';
            return $http.post(url)
                .then(function(response){
                    return response.data;
                })
        }

        function register(user){
            var url = '/api/assignment/register';
            return $http.post(url, user)
                .then(function(response){
                    return response.data;
                })
        }
    }
})();