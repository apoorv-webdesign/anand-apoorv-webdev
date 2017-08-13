/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('YON')
        .service('mapService', mapService);

    function mapService($http) {
        var api={
            searchLocation: searchLocation,
            getLocationAsText: getLocationAsText
        };
        return api;

        var urlBase = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
        var key = "AIzaSyA-FduCwvYeyUpRqaFGWw3OD0BYO2rPi3o";

        function searchLocation() {
            var urlBase = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA-FduCwvYeyUpRqaFGWw3OD0BYO2rPi3o';
            return $http.post(urlBase,{"considerIp": "true"});

        }

        function getLocationAsText(lat,lng){
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyA-FduCwvYeyUpRqaFGWw3OD0BYO2rPi3o'
            return $http.get(url);
        }
    }
})();