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
        model.findUserById = findUserById;
        model.logout = logout;
        model.ya = ya;
        model.na =na;
        model.disableYa = disableYa;
        model.disableNa = disableNa;
        model.postFatsecret = postFatsecret;
        model.timeSince = timeSince;

        // model.disableYaBtn = false;
        // model.disableNaBtn = false;
        model.posts={};

        function init(){
            if(model.user._id){
                postService
                    .findAllFollowPosts(model.user)
                    .then(function(data){
                        model.posts = data;
                    })
            }
        }
        init();

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
                    model.user._id.fuf = "Unfollow";
                })
        }

        function deleteFollow(user){
            userService
                .deleteFollow(model.user, user)
                .then(function(result){
                    model.message = "Unfollowed";
                    model.user._id.fuf = "Follow";
                })
        }

        function userFollowStatus(user){
            var currentUserFollows = model.user.follow;
            for (var i=0; i<currentUserFollows.length; i++){
                if(user._id == currentUserFollows[i]){
                    //model.followStatus = "UnFollow"
                    return "Unfollow";
                }
            }
            //model.followStatus = "Follow"
            return "Follow";
        }

        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login');
                });
        }

        function findUserById(userId){
            return userService
                .findUserById(userId)
                .then(function(user){
                    return user.username;
                })
        }

        function ya(post){
            //console.log()
            if(post.ya._user.indexOf(model.user._id)<0) {
                post.ya['count'] += 1;
                post.ya._user = model.user;
                postService
                    .ya(post)
                    .then(function (status) {
                        init();
                    })
            }
        }

        function na(post){
            if(post.na._user.indexOf(model.user._id)<0) {
                post.na['count'] += 1;
                post.na._user = model.user;
                postService
                    .na(post)
                    .then(function (status) {
                        init();
                    })
            }
        }

        function disableYa(post){
            if(post.ya._user.username.indexOf(model.user.username) > -1){
                return "disabled"
            }
        }

        function disableNa(){
            if(post.na._user.username.indexOf(model.user.username) > -1){
                return "disabled"
            }
        }

        function createPost(post){
            post._user = currentUser;
            post.username = currentUser.username;
            console.log(post);
            postService
                .createPost(post)
                .then(function(data){
                    if(data){
                        init();
                        model.newPost={};
                        model.postmessage = "Posted";
                    }
                })
        }

        function postFatsecret(food){
            fatSecretService
                .createFatsecret(food)
                .then(function(status){
                    console.log(status);
                })

            // post._user = currentUser;
            // post.username = currentUser.username;
            // //post._fatsecret = fatsecret;
            // console.log(post)
            // postService
            //     .createPost(post, fatsecret)
            //     .then(function(data){
            //         if(data){
            //             model.message = "Posted";
            //         }
            //     })
        }

        function timeSince(tst) {
            var timeStamp = new Date(tst);
            var now = new Date(),
                secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
            if(secondsPast < 60){
                return timeAgo = parseInt(secondsPast) + 's ago';
            }
            if(secondsPast < 3600){
                return timeAgo = parseInt(secondsPast/60) + 'm ago';
            }
            if(secondsPast <= 86400){
                return timeAgo = parseInt(secondsPast/3600) + 'h ago';
            }
            if(secondsPast > 86400){
                day = timeStamp.getDate();
                month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
                year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
                return timeAgo =  day + " " + month + year;
            }
        }
    }
})();
