"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ga_helper_1 = require('../utils/ga-helper');
var StaticModel = (function (_super) {
    __extends(StaticModel, _super);
    function StaticModel() {
        _super.apply(this, arguments);
    }
    return StaticModel;
}(Backbone.Model));
var StaticView = (function (_super) {
    __extends(StaticView, _super);
    function StaticView() {
        _super.apply(this, arguments);
    }
    StaticView.prototype.initialize = function () {
        this.$el = $('section#content');
    };
    StaticView.prototype.pageView = function (pageName, route) {
        ga_helper_1.gaPageView(pageName, route);
    };
    return StaticView;
}(Backbone.View));
exports.StaticView = StaticView;
