/**
 * Created by Apoorv on 26-07-2017.
 */
(function () {
    angular
        .module('YON')
        .controller('adminUsersController', adminUsersController)

    function adminUsersController(userService){
        var model = this;
        model.deleteUser = deleteUser;

        function init(){
            findAllUsers();
        }
        init();

        function deleteUser(user){
            console.log('delete');
            userService
                .deleteUser(user._id)
                .then(function(status){
                    console.log(status);
                    findAllUsers();
                });
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
