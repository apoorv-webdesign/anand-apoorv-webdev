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
                templateUrl: 'views/home/templates/home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
    }
})();
