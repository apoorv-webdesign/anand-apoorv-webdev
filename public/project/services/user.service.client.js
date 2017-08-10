/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .factory('userService', userService);

    function userService($http) {
        var api = {
            login: login,
            findUserByCredentials: findUserByCredentials,
            registrationValidation : registrationValidation,
            register : register,
            checkLoggedIn: checkLoggedIn,
            logout:logout,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser
        };
        return api;

        function login(username, password){
            var url = '/api/project/login/';
            var credential = {username: username, password: password};
            return $http
                .post(url, credential)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = '/api/project/user/';
            var credential = {username: username, password: password};

            return $http
                .post(url, credential)
                .then(function (response) {
                    return response.data;
                });
        }

        function registrationValidation(username){
            var url = '/api/project/user/register/validation/'
            var credential = {username: username};
            return $http
                .post(url, credential)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user){
            var url = '/api/project/register/';
            return $http.post(url, user)
                .then(function(response){
                    return response.data;
                }, function(err){
                    console.log(err);
                })
        }

        function checkLoggedIn(){
            var url = '/api/project/checkLoggedIn/';
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function logout(){
            var url = '/api/project/logout/';
            return $http.post(url)
                .then(function(response){
                    return response.data;
                })
        }

        function findAllUsers(){
            var url=  '/api/project/allUsers/';
            return $http.post(url)
                .then(function(response){
                    return response.data;
                })
        }

        function deleteUser(userId){
            var url = '/api/project/deleteUser/'+ userId;
            return $http.delete(url)
                .then(function(status){
                    //console.log(response.data);
                    return status;
                })
        }
    }
})();