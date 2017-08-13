/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('YON')
        .service('fatSecretService', fatSecretService);

    function fatSecretService($http) {
        var api={
            search: search
        };
        return api;

        function search(searchText){
            var url= '/api/project/fat/'+searchText;

            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }
    }
})();