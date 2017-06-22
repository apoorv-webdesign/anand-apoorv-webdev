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
            var found = userService.findUserByCredentials(username, password);
            if (found !== null) {
                $location.url('/user/'+ found._id);//.message = "welcome " + username;
            }
            else {
                if(!username || !password){
                    model.message = "Please enter username and password";
                }
                else {
                    model.message = "sorry, username: " + username + " does not exists"
                }
            }
        }
    }
})();