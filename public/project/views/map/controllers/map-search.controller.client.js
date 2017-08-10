(function () {
    angular
        .module('YON')
        .controller('mapSearchController', mapSearchController);

    function mapSearchController(mapService, postService, $location, currentUser) {
        var model = this;
        model.post={};
        model.searchLocation = searchLocation;
        model.createPost = createPost;

        function createPost(post){
            post.user = currentUser;
            console.log(post);
            postService
                .createPost(post)
                .then(function(data){
                    if(data){
                        model.message = "Posted";
                    }
                })
        }


        function searchLocation(){
            mapService
                .searchLocation()
                .then(function(response) {
                    var lat = response.data.location.lat;
                    var lng = response.data.location.lng;
                    mapService
                        .getLocationAsText(lat,lng)
                        .then(function(response){
                            address = response.data.results[0].address_components
                            var text ="";
                            for(i=0; i<address.length; i++){
                                text += address[i].long_name +', ';
                            }
                            model.post.location = text;//response.data.results[0].address_components;
                        });
                });
        }
    }
})();
