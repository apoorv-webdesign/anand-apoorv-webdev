/**
 * Created by Apoorv on 21-06-2017.
 */
(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService() {

        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api = {
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            createId = widgets[widgets.length -1]._id;
            newId = parseInt(createId) + 1 + '';
            widget._id = newId;
            widget.pageId = pageId;
            widgets.push(widget);
            return newId;
        }

        function updateWidget(widgetId, widget) {
            for(v in widgets){
                if(widgets[v].id === widgetId){
                    widgets[v] = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }

        function findWidgetById(widgetId) {
            //console.log(widgetId);
            for(v in widgets){
                if(widgets[v]._id === widgetId){
                    return widgets[v];
                }
            }

        }

        function findWidgetsByPageId(pageId) {
            var results = [];

            for(var v in widgets) {
                if(widgets[v].pageId === pageId) {
                    results.push(widgets[v]);
                }
            }

            return results;
        }
    }
})();