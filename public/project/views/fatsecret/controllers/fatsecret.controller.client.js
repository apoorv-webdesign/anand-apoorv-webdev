(function(){
    angular
        .module('YON')
        .controller('fatsecretController', fatsecretController);

    function fatsecretController(postService, userService, fatSecretService, currentUser, $routeParams, $location){
        var model = this;
        model.foodId = $routeParams['fatsecret'];
        model.user = currentUser;

        function init(){
            fatSecretService
                .findFatsecretById(model.foodId)
                .then(function(data){
                    if(data.length>0) {
                        model.fatsecret = data;
                    }
                    else{
                        console.log('pppppp0');
                        fatSecretService
                            .searchById(model.foodId)
                            .then(function(data) {
                                if(result.length>0) {
                                    model.fatsecret = data;
                                }
                            })
                    }
                });
        }
        init();
    }
})();
