"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Template = require('../templates/layout.hbs');
var LayoutView = (function (_super) {
    __extends(LayoutView, _super);
    function LayoutView() {
        _super.apply(this, arguments);
    }
    LayoutView.prototype.render = function () {
        var menuItems = this.model.menu.toJSON();
        var template = Handlebars.compile(Template({
            menuItems: menuItems
        }));
        var html = template();
        this.$el.html(html);
        return this;
    };
    return LayoutView;
}(Backbone.View));
exports.LayoutView = LayoutView;
