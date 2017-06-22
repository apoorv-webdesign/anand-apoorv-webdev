/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

            this.createPage = createPage;
            this.findPagesByWebsiteId = findPagesByWebsiteId;
            this.findPageById = findPageById;
            this.updatePage = updatePage;
            this.deletePage = deletePage;

        function createPage(websiteId, page) {
            createId = pages[pages.length -1]._id;
            newId = parseInt(createId) + 1 + '';
            page._id = newId;
            page.websiteId = websiteId;
            pages.push(page);
        }

        function updatePage(pageId, page) {
            for(v in pages){
                if(pages[v].id === pageId){
                    pages[v] = page;
                }
            }
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findPagesByWebsiteId(websiteId) {
            var listOfPages = [];

            for (var v in pages) {
                if (pages[v].websiteId === websiteId) {
                    listOfPages.push(pages[v]);
                }
            }
            return listOfPages;
        }
    }
})();