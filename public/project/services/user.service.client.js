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
            deleteUser: deleteUser,
            search: search,
            addFollow: addFollow,
            deleteFollow: deleteFollow,
            updateUser: updateUser,
            checkAdmin: checkAdmin,
            findAllFollows: findAllFollows,
            unRegister: unRegister
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

        function findAllFollows(user){
            var url=  '/api/project/allFollows/';
            return $http.post(url, user)
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

        function search(searchText) {
            var url = '/api/project/user/search/' + searchText;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addFollow(currentUser, followedUser){
            var url = '/api/project/user/follow/';
            var user = {};
            user.currentUser = currentUser;
            user.followedUser = followedUser;
            return $http.post(url, user)
                .then(function (status) {
                    return status;
                })
        }

        function deleteFollow(currentUser, followedUser){
            var url = '/api/project/user/unfollow/';
            var user = {};
            user.currentUser = currentUser;
            user.followedUser = followedUser;
            return $http.post(url, user)
                .then(function (status) {
                    return status;
                })
        }

        function updateUser(user){
            var url = '/api/project/updateUser/';
            return $http.put(url, user)
                .then(function(status){
                    return status;
                })
        }

        function checkAdmin(){
            var url = '/api/project/checkAdmin';
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }

        function unRegister(user){
            var url ='/api/project/unregister/'+user._id;
            return $http.delete(url)
                .then(function(response){
                    return response;
                })
        }
    }
})();