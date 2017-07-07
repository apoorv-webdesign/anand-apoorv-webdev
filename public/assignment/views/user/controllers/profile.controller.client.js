/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams['userId'];
        model.update = update;
        model.deleteUser = deleteUser;

        userService
            .findUserById(userId)
            .then(renderUser,userError);

        function renderUser(user){
            model.user = user;
        }

        function userError(user){
            $location.url('/login');
            model.error = "User not found";
        }

        function update(user) {
            userService
                .updateUser(userId, user)
                .then(profileUpdated);
        }

        function profileUpdated(userId){
            console.log(userId);
            model.message = 'Profile Updated!';
            //$location.url('/user/'+userId)
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(userDeleted, userNotDeleted);
        }

        function userDeleted(){
            $location.url('/');
        }

        function userNotDeleted(){
            model.error = "User not deleted";
        }
    }
})();