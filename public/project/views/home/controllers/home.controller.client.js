(function(){
    angular
        .module('YON')
        .controller('homeController', homeController);

    function homeController(postService, userService, fatSecretService, currentUser, $route, $location){
        var model = this;
        model.user = currentUser;

        model.search = search;
        model.addFollow = addFollow;
        model.deleteFollow = deleteFollow;
        model.userFollowStatus = userFollowStatus;
        model.logout = logout;

        function search(searchText){
            model.searchText = searchText;
            model.postSearchResults=undefined;
            model.userSearchResults=undefined;
            model.foodSearchResults=undefined;
            postService
                .search(searchText)
                .then(function(result) {
                    if (result.length>0) {
                        model.postSearchResults = result;
                    }
                })
            userService
                .search(searchText)
                .then(function(result){
                    if (result.length>0) {
                        model.userSearchResults = result;
                    }
                })
            fatSecretService
                .search(searchText)
                .then(function(result) {
                    if(result.length>0) {
                        model.foodSearchResults = result;
                    }
                })
        }

        function addFollow(user){
            console.log(model.user);
            userService
                .addFollow(model.user, user)
                .then(function(result){
                    model.message = "Followed";
                    //search(model.searchText);
                })
        }

        function deleteFollow(user){
            userService
                .deleteFollow(model.user, user)
                .then(function(result){
                    model.message = "Unfollowed";
                    //search(model.searchText);
                })
        }

        function userFollowStatus(user){
            var currentUserFollows = model.user.follow;
            for (var i=0; i<currentUserFollows.length; i++){
                if(user._id === currentUserFollows[i]){
                    model.followStatus = "UnFollow"
                    return true;
                }
            }
            model.followStatus = "Follow"
            return false;
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
