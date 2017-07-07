/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce, $routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        //model.editWidgetUrl = editWidgetUrl;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        //console.log(model.userId);
        //console.log(model.websiteId);
        //console.log(model.widgetId);
        function init(){
            widgetService
                .findWidgetById(model.widgetId)
                .then(assignWidget);
        }
        init();

        function assignWidget(widget){
            model.widget = widget;
        }

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widgetId,widget)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }
    }
})();