/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;
        model.websiteerror = false;
        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(assignWebsites);
        }
        init();

        function assignWebsites(websites){
            model.websites = websites;
        }

        function createWebsite(website) {
            if (website === null || website === '' || typeof website === 'undefined') {
                model.websiteerror = 'website name is required';
                return;
            }
            websiteService
                .createWebsite(model.userId, website)
                .then(reDirect);
        }

        function reDirect(){
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();