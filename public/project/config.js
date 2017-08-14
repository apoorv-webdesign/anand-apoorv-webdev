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
                templateUrl: 'views/home/templates/home.view.client.html',
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
            .when('/restro', {
                templateUrl: 'views/user/templates/profile-restro.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkAdmin
                }
            })
            .when('/searchMaps', {
                templateUrl: 'views/post/templates/post-new.view.client.html',
                controller: 'postNewController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            // .when('/user/home', {
            //     templateUrl: 'views/post/templates/post-list.view.client.html',
            //     controller: 'postListController',
            //     controllerAs: 'model',
            //     resolve:{
            //         currentUser:checkLoggedIn
            //     }
            // })
            // .when('/user/post/:postId', {
            //     templateUrl: 'views/post/templates/post-edit.view.client.html',
            //     controller: 'postEditController',
            //     controllerAs: 'model',
            //     resolve:{
            //         currentUser:checkLoggedIn
            //     }
            // })
            //
            // .when('/home/view/:postId', {
            //     templateUrl: 'views/post/templates/post-detail.view.client.html',
            //     controller: 'postViewController',
            //     controllerAs: 'model',
            //     resolve:{
            //         currentUser:checkCurrentUser
            //     }
            // })

            .when('/post/:postId', {
                templateUrl: 'views/post/templates/post-detail.view.client.html',
                controller: 'postDetailViewController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/profile/:userId', {
                templateUrl: 'views/user/templates/profile-visit.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
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
    function checkAdmin($q, $location, userService){
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function(currentUser){
                if(currentUser === '0'){
                    deferred.reject();
                    $location.url('/');
                }
                else{
                    deferred.resolve(currentUser);
                }
            })
        return deferred.promise;
    }
})();
