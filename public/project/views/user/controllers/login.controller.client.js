/**
 * Created by Apoorv on 31-07-2017.
 */

(function () {
    angular
        .module('YON')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function login(username, password) {

            userService
                .findUserByCredentials(username, password)
                //.login(username, password)
                .then(returnUser, userNotExists);

            function returnUser(found) {
                //console.log(found);
                $location.url('/profile');//('/user/' + found._id);//.message = "welcome " + username;
            }

            function userNotExists() {
                model.error = "sorry, username does not exists"
            }
        }
    }
})();
