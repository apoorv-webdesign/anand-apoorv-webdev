/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);

    function flickrService($http) {

        var key = "b093f34a1489d26b2a3f5a3dccf6eadb";
        var secret = "2209df0a2571b99b";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api={
            searchPhotos: searchPhotos
        };
        return api;


        console.log(urlBase);
            function searchPhotos(searchTerm) {
                //console.log(urlBase);
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();