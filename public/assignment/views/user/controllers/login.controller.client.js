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
            //var found = userService.findUserByCredentials(username, password);

            userService
                .findUserByCredentials(username, password)
                .then(returnUser, userNotExists);

            function returnUser(found) {
                //console.log(found);
                $location.url('/user/' + found._id);//.message = "welcome " + username;
            }

            function userNotExists() {
                model.error = "sorry, username does not exists"
            }
        }
    }
})();