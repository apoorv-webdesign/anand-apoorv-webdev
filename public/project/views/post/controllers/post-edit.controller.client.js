/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;
        model.websiteediterror = false;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(assignWebsites);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(assignWebsite);
        }
        init();

        function assignWebsite(website){
            model.website = website;
        }

        function assignWebsites(websites){
            model.websites = websites;
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(updateUrl);
        }

        function updateWebsite(website) {
            console.log('update');
            if (website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.websiteediterror = 'website name is required';
                return;
            }
            websiteService
                .updateWebsite(website._id,website)
                .then(updateUrl);
        }

        function updateUrl(){
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();