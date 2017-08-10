/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .controller('registerController', registerController);

    function registerController($location, userService) {
        var model= this;
        model.register= register;

        function register(username, password, verifyPassword) {
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
            if (verifyPassword === null || verifyPassword === '' || typeof verifyPassword === 'undefined') {
                model.vpasserror = 'verify password is required';
                return;
            }
            if (password !== verifyPassword || verifyPassword === null || typeof verifyPassword === 'undefined') {
                model.error = "password and verify password do not match";
                return;
            }

            userService
                .registrationValidation(username)
                .then(userExists, userNotExists)

            function userExists() {
                model.error = "Sorry, that username is taken";
            }

            function userNotExists(res) {
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
        }
    }
})();
