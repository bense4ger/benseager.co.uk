"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuModel = (function (_super) {
    __extends(MenuModel, _super);
    function MenuModel() {
        _super.apply(this, arguments);
    }
    MenuModel.prototype.defaults = function () {
        return {
            items: [
                { name: 'Home', route: '/' },
                { name: 'Build', route: 'build' },
                { name: 'Contact', route: 'contact' },
            ]
        };
    };
    return MenuModel;
}(Backbone.Model));
exports.MenuModel = MenuModel;
