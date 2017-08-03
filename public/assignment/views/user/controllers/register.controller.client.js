/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {
            model.error = false;
            model.unameerror = false;
            model.passerror = false;
            model.vpasserror = false;
            if (username === null || username === '' || typeof username === 'undefined') {
                model.unameerror = 'username is required';
                return;
            }
            if (password === null || password === '' || typeof password === 'undefined') {
                model.passerror = 'password is required';
                return;
            }
            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.vpasserror = 'verify password is required';
                return;
            }
            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "password and verify password do not match";
                return;
            }

            userService
                .registrationCheck(username)
                .then(userExists, userDoesNotExists);
                //.then(createNewUser);

            function userExists() {
                model.error = "sorry, that username is taken";
            }

            function userDoesNotExists(res) {
                var newUser = {
                    username: username,
                    password: password
                };
                return userService
                    .register(newUser)
                    .then(function(status){
                        $location.url('/profile');
                    })
            }

            function createNewUser(user){
                $location.url('/profile');
            };
        }
    }
})();