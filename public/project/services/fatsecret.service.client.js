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
            createFatsecret: createFatsecret

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
    }
})();