/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            //model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(assignPages);
        }
        init();

        function assignPages(pages){
            model.pages = pages;
        }
    }
})();