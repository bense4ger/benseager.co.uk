"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var static_view_1 = require('./static-view');
var Template = require('../templates/build.hbs');
var BuildView = (function (_super) {
    __extends(BuildView, _super);
    function BuildView() {
        _super.apply(this, arguments);
    }
    BuildView.prototype.render = function () {
        var template = Handlebars.compile(Template());
        var html = template();
        this.$el.html(html);
        this.pageView('build', '/#build');
        return this;
    };
    return BuildView;
}(static_view_1.StaticView));
exports.BuildView = BuildView;
