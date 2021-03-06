/**
 * Created by Apoorv on 19-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce, $routeParams, widgetService, $location) {
        var model = this;
        model.widgeterror = false;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.editWidgetUrl = editWidgetUrl;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        //console.log(model.userId);
        //console.log(model.websiteId);
        //console.log(model.widgetId);
        function init(){
            widgetService
                .findWidgetById(model.widgetId)
                .then(function(widget){
                    model.widget = widget;
                });
        }
        init();

        function editWidgetUrl(widget) {
            //console.log(widget);
            if(typeof widget !== 'undefined') {
                var url = 'views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '.edit.view.client.html';
                return url;
            }
        }

        function updateWidget(widget) {
            if (widget.widgetType !='TEXT' &&(widget.name === null || widget.name === '' || typeof widget.name === 'undefined') ) {
                model.widgeterror = 'widget name is required';
                return;
            }
            widgetService
                .updateWidget(model.widgetId,widget)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId, model.pageId)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }
    }
})();