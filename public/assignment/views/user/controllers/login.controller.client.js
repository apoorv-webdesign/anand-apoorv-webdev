/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function login(username, password) {
            model.error = false;
            model.unameerror = false;
            model.passerror = false;
            if(username === null || username === '' || typeof username === 'undefined'){
                model.unameerror = "username is required";
                return;
            }
            if(password === null || password === '' || typeof password === 'undefined'){
                model.passerror = "password is required";
                return;
            }
            userService
                .login(username, password)
                .then(returnUser, userNotExists);

            function returnUser(found) {
                if(found != null) {
                    $location.url('/profile');
                }
            }

            function userNotExists() {
                model.error = "sorry, username/password does not exists"
            }
        }
    }
})();