/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  $location,
                                  pageService) {
        var model = this;
        model.pageerror = false;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            //model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function(pages){
                    model.pages =pages;
                });
        }
        init();

        function createPage(page) {
            if (page === null || page === '' || typeof page === 'undefined') {
                model.pageerror = 'page name is required';
                return;
            }
            pageService
                .createPage(model.websiteId, page)
                .then(reDirect);
        }

        function reDirect(pages){
            model.pages = pages;
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();