/**
 * Created by Apoorv on 26-07-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('adminUsersController', adminUsersController)

    function adminUsersController(userService){
        var model = this;
        model.deleteUser = deleteUser;

        function init(){
            findAllUsers();
        }
        init();

        function deleteUser(user){
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function findAllUsers(){
            userService
                .findAllUsers()
                .then(function(users){
                    model.users = users;
                })
        }
    }
})();
