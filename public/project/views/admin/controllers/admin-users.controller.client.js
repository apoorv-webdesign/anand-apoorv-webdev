/**
 * Created by Apoorv on 26-07-2017.
 */
(function () {
    angular
        .module('YON')
        .controller('adminUsersController', adminUsersController)

    function adminUsersController(userService, currentUser, $location){
        var model = this;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.updateUser = updateUser;
        model.edit = edit;
        model.create = create;
        model.currentuser = currentUser;
        model.logout = logout;

        model.enableEdit=false;

        function init(){
            findAllUsers();
        }
        init();

        function deleteUser(user){
            console.log('delete');
            userService
                .deleteUser(user._id)
                .then(function(status){
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

        function create(user){
            model.user = {};
            model.enableEdit = false;
        }
        function createUser(user){
            console.log(user);
            user.roles = user.roles.split(",");
            user.password = "admin123";
            userService
                .register(user)
                .then(function(status){
                    model.user={};
                    findAllUsers();
                })
        }

        function edit(user){
            model.user = user;
            model.enableEdit = true;
        }
        function updateUser(user){
            console.log(user.roles);
            if(typeof user.roles != 'string') {
                user.roles = user.roles.join(',');
            }
            if(typeof user.roles == 'string') {
                user.roles = user.roles.split(",");
            }
            userService
                .updateUser(user)
                .then(function(status){
                    model.user={};
                    findAllUsers();
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();
