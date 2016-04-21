"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var menu_model_1 = require('./menu-model');
var LayoutModel = (function (_super) {
    __extends(LayoutModel, _super);
    function LayoutModel() {
        _super.apply(this, arguments);
    }
    LayoutModel.prototype.defaults = function () {
        return {
            menu: new menu_model_1.MenuModel()
        };
    };
    Object.defineProperty(LayoutModel.prototype, "menu", {
        get: function () {
            return this.get('menu');
        },
        enumerable: true,
        configurable: true
    });
    return LayoutModel;
}(Backbone.Model));
exports.LayoutModel = LayoutModel;
