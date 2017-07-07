(function () {
    angular
        .module('WAM')
        .controller('widgetFlickrSearchController', widgetFlickrSearchController);

    function widgetFlickrSearchController(flickrService, widgetService, $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm){
            //console.log(searchTerm);
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            console.log('test');
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget= { "_id": model.widgetId, "widgetType": "IMAGE", "pageId": model.pageId, "width": "100%",
                    "url": url};
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(addUrl);
        }

        function addUrl(){
            $location.url('/widget/' + model.widgetId);
        }

    }
})();
