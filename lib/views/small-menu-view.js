"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Template = require('../templates/small-menu.hbs');
var SmallMenuView = (function (_super) {
    __extends(SmallMenuView, _super);
    function SmallMenuView() {
        _super.apply(this, arguments);
    }
    SmallMenuView.prototype.events = function () {
        return {
            'click a.small-menu-link': 'closeMenu'
        };
    };
    SmallMenuView.prototype.render = function () {
        var menuItems = this.model.menu.items;
        var template = Handlebars.compile(Template({
            menuItems: menuItems
        }));
        var html = template();
        this.$el.html(html);
        this.delegateEvents();
        return this;
    };
    SmallMenuView.prototype.closeMenu = function () {
        setTimeout(function () {
            $('div#off-canvas').foundation('close');
        }, 150);
    };
    return SmallMenuView;
}(Backbone.View));
exports.SmallMenuView = SmallMenuView;
