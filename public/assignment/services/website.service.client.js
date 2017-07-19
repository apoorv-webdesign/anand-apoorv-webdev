/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);

    function websiteService($http) {
        var api = {
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            deleteWebsite: deleteWebsite,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
        }
        return api;

        function createWebsite(userId, website) {
            var url = '/api/assignment/user/'+userId+'/website';
            var website = {"name": website.name, "description": website.description, "developerId": userId};

            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url ='/api/assignment/website/'+websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = '/api/assignment/website/'+websiteId;

            return $http.put(url, website)
                .then(function (response) {
                    return response;
                });
        }

        function findWebsiteById(websiteId) {
            var url = '/api/assignment/website/'+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            var url = '/api/assignment/user/' + userId + '/websites';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();