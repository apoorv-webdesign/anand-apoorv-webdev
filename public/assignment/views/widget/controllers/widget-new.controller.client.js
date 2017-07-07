/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createWidget = createWidget;

        function init() {
            widgetService
                .findWidgetsByPageId(model.websiteId)
                .then(function (widget) {
                    console.log('test');
                    model.widget =widget;
                });
        }
        init();

        function createWidget(widgetType){
            var newWidget = {
                widgetType: widgetType
            }
            //var id = widgetService.createWidget(model.pageId, newWidget);
            widgetService
                .createWidget(model.pageId, newWidget)
                .then(reDirect);

            function reDirect(id) {
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + id);
            }
        }
    }
})();