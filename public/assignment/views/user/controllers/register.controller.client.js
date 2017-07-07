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
            //console.log(username, password, password2);
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(userExists, userDoesNotExists)
                .then(createNewUser);

            function userExists() {
                model.error = "sorry, that username is taken";
            }

            function userDoesNotExists(res) {
                var newUser = {
                    username: username,
                    password: password
                };
                return userService
                    .createUser(newUser)
            }

            function createNewUser(user){
                $location.url('/user/' + user._id);
            };
        }
    }
})();