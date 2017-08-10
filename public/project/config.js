/**
 * Created by Apoorv on 30-07-2017.
 */
(function () {
    angular
        .module('YON')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/admin/users', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model'
            })
            .when('/searchMaps', {
                templateUrl: 'views/map/templates/map-search.view.client.html',
                controller: 'mapSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
    }

    function checkLoggedIn($q, $location, userService){
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(currentUser){
                if(currentUser === '0'){
                    deferred.reject();
                    $location.url('/login');
                }
                else{
                    deferred.resolve(currentUser);
                }
            })
        return deferred.promise;
    }

    function checkCurrentUser($q, $location, userService){
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(currentUser){
                if(currentUser === '0'){
                    deferred.resolve({});
                }
                else{
                    deferred.resolve(currentUser);
                }
            })
        return deferred.promise;
    }
})();
