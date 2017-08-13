/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('YON')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService, postService, mapService) {
        var model = this;
        //  var userId = currentUser._id;//$routeParams['userId'];
        model.user = currentUser;
        model.update = update;
        model.unRegister = unRegister;
        model.logout = logout;
        model.timeSince = timeSince;
        model.deletePost = deletePost;
        model.updatePost = updatePost;
        model.enableUpdateInput = enableUpdateInput;
        model.searchLocation = searchLocation;
        model.createPost = createPost;
        model.userHostId = $routeParams['userId']

        model.enableEdit = false;
        model.newPost = {};

        function init() {
            postService
                .findAllPostsForUser(model.user)
                .then(function (data) {
                    model.posts = data;
                })

            userService
                .findAllFollows(model.user)
                .then(function (data) {
                    model.follow = data;
                })

            if (model.userHostId) {
                userService
                    .findUserById(model.userHostId)
                    .then(function (user) {
                        model.userHost = user;
                        return postService
                            .findAllPostsForUser(model.userHost);
                    })
                    .then(function (data) {
                        return model.userHostPosts = data;
                    })
                    .then(function(status){
                        return userService
                            .findAllFollows(model.userHost)
                            .then(function (data) {
                                model.userHostfollow = data;
                                console.log(model.userHostfollow)
                            })
                    })
            }
        }

        init();


        function userError(user) {
            $location.url('/login');
            model.error = "User not found";
        }

        function update(user) {
            userService
                .updateUser(user)
                .then(profileUpdated);
        }

        function profileUpdated(userId) {
            model.message = 'Profile Updated!';
        }

        function unRegister(user) {
            userService
                .unRegister(user)
                .then(userDeleted, userNotDeleted);
        }

        function userDeleted() {
            $location.url('/');
        }

        function userNotDeleted() {
            model.error = "User not deleted";
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deletePost(post) {
            postService
                .deletePost(post)
                .then(function (status) {
                    if (status) {
                        init();
                    }
                });
        }

        function enableUpdateInput(postId) {
            model.enableEdit = postId;
            init();
        }

        function updatePost(post) {
            console.log(post);
            postService
                .updatePost(post._id, post)
                .then(function (status) {
                    if (status) {
                        model.enableEdit = false;
                        init();
                    }
                });
        }

        function createPost(post) {
            post._user = currentUser;
            post.username = currentUser.username;
            console.log(post);
            postService
                .createPost(post)
                .then(function (data) {
                    if (data) {
                        init();
                        model.newPost = {};
                        model.postmessage = "Posted";
                    }
                })
        }

        function timeSince(tst) {
            var timeStamp = new Date(tst);
            var now = new Date(),
                secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
            if (secondsPast < 60) {
                return timeAgo = parseInt(secondsPast) + 's ago';
            }
            if (secondsPast < 3600) {
                return timeAgo = parseInt(secondsPast / 60) + 'm ago';
            }
            if (secondsPast <= 86400) {
                return timeAgo = parseInt(secondsPast / 3600) + 'h ago';
            }
            if (secondsPast > 86400) {
                day = timeStamp.getDate();
                month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
                year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
                return timeAgo = day + " " + month + year;
            }
        }

        function searchLocation() {
            mapService
                .searchLocation()
                .then(function (response) {
                    var lat = response.data.location.lat;
                    var lng = response.data.location.lng;
                    mapService
                        .getLocationAsText(lat, lng)
                        .then(function (response) {
                            address = response.data.results[0].address_components
                            var text = "";
                            console.log(address);
                            for (i = 0; i < address.length; i++) {
                                if (address[i].types.indexOf('political') > -1) {
                                    text += address[i].long_name + ', ';
                                }
                            }
                            model.newPost.location = text;//response.data.results[0].address_components;
                        });
                });
        }
    }
})();