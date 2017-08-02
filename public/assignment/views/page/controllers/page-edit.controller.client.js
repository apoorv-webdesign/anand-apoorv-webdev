/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;
        model.pageediterror = false;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(assignPages);
            pageService
                .findPageById(model.pageId)
                .then(assignPage);
        }
        init();

        function assignPages(pages){
            model.pages = pages;
        }

        function assignPage(page){
            model.page = page;
        }

        function updatePage(page) {
            if (page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.pageediterror = 'page name is required';
                return;
            }
            page._id = model.pageId;
            page.websiteId = model.websiteId;

            pageService
                .updatePage(model.pageId, page)
                .then(reDirect);
        }

        function reDirect(){
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(reDirect);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();