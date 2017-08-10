(function(){
    angular
        .module('YON')
        .controller('homeController', homeController);

    function homeController(currentUser){
        var model = this;
        model.currentUser = currentUser;
    }
})();
