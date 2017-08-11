(function(){
    angular
        .module('YON')
        .controller('homeController', homeController);

    function homeController(postService, currentUser){
        var model = this;
        model.currentUser = currentUser;
        model.search = search;

        function search(searchText){
            postService
                .search(searchText)
                .then(function(result){
                    model.searchResults = result;
                })
        }
    }
})();
