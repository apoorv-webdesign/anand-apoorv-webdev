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

            function returnUser(user) {
                if(user.roles.indexOf('RESTAURANT')<0){
                    $location.url('/');
                }
                else{
                    console.log('to restro');
                    $location.url('/restro');
                }
            }

            function userNotExists() {
                model.error = "sorry, username does not exists"
            }
        }
    }
})();
