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
        model.user = userService.findUserById(userId);

        function update(user) {
            userService.updateUser(userId, user);
            model.message = 'Profile Updated!';
            $location.url('/user/'+userId);
        }
    }
})();