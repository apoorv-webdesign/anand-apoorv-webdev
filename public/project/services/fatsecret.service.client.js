/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('YON')
        .service('fatSecretService', fatSecretService);

    function fatSecretService($http) {
        var api={
            search: search,
            createFatsecret: createFatsecret,
            findFatsecretById: findFatsecretById,
            searchById:searchById

    };
        return api;

        function search(searchText){
            var url= '/api/project/fat/'+searchText;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createFatsecret(food){
            var url= '/api/project/createFatsecret/';
            return $http.post(url, food)
                .then(function (response) {
                    return response.data;
                });
        }

        function findFatsecretById(id){
            var url= '/api/project/findFatsecretById/'+id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }searchById

        function searchById(id){
            var url= '/api/project/searchById/'+id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();