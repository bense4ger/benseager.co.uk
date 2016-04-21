"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var static_view_1 = require('./static-view');
var Template = require('../templates/home.hbs');
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        _super.apply(this, arguments);
    }
    HomeView.prototype.render = function () {
        var template = Handlebars.compile(Template());
        var html = template();
        this.$el.html(html);
        return this;
    };
    return HomeView;
}(static_view_1.StaticView));
exports.HomeView = HomeView;
