"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var reflector_1 = require('../utils/reflector');
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        _super.apply(this, arguments);
    }
    return Router;
}(Backbone.Router));
exports.Router = Router;
function bootstrapRouter(router, routeData) {
    _.each(routeData, function (rd) {
        router.prototype[rd.name.toLowerCase()] = function () {
            var viewName = rd.name + "View";
            var view = reflector_1.Reflector.createNewInstance(viewName);
            view.render();
        };
    });
}
exports.bootstrapRouter = bootstrapRouter;
