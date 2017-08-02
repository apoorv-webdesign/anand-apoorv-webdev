/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService) {
        var model = this;
        //  var userId = currentUser._id;//$routeParams['userId'];
        model.user = currentUser;
        model.update = update;
        model.unRegister = unRegister;
        model.logout = logout;

        // userService
        //     .findUserById(userId)
        //     .then(renderUser,userError);

        // function init(){
        //     renderUser(currentUser);
        // }
        // init();

        // function renderUser(user){
        //     model.user = user;
        // }

        function userError(user){
            $location.url('/login');
            model.error = "User not found";
        }

        function update(user) {
            userService
                .updateUser(user._id, user)
                .then(profileUpdated);
        }

        function profileUpdated(userId){
            console.log(userId);
            model.message = 'Profile Updated!';
            //$location.url('/user/'+userId)
        }

        function unRegister(user) {
            userService
                .unRegister()
                .then(userDeleted, userNotDeleted);
        }

        function userDeleted(){
            $location.url('/');
        }

        function userNotDeleted(){
            model.error = "User not deleted";
        }

        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login');
                });
        }
    }
})();