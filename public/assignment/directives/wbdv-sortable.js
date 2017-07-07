/**
 * Created by Apoorv on 06-07-2017.
 */

(function () {
    angular
        .module('WAM')
        .directive('wbdv-sortable', sortableDirectives);

    function sortableDirectives() {
        function linkfunc(scope, element, attributes) {
            var start = -1;
            var final = -1;
            element.sortable({
                axis: 'y',
                cursor: 'move',
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    final = ui.item.index();
                    if (start != final) {
                        scope.model.reOrderWidgets(start, final);
                    }
                }
            });
        }

        return {
            link: linkfunc
        }
    }
})();