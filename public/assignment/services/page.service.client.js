/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Post 3", "websiteId": "123", "description": "Lorem"}
        ];

            this.createPage = createPage;
            this.findPagesByWebsiteId = findPagesByWebsiteId;
            this.findPageById = findPageById;
            this.updatePage = updatePage;
            this.deletePage = deletePage;

        function createPage(websiteId, page) {
            var url = '/api/assignment/website/'+websiteId+'/page';

            return $http.post(url, page)
                .then(function (response) {
                    //console.log(response.data);
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = '/api/assignment/page/'+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = '/api/assignment/page/'+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = '/api/assignment/page/'+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPagesByWebsiteId(websiteId) {
            var url = '/api/assignment/website/'+websiteId+'/page';
            //console.log('match');
            return $http.get(url)
                .then(function (response) {
                    //console.log(response.data);
                    return response.data;
                });
        }
    }
})();