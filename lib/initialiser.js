"use strict";
var menu_model_1 = require('./models/menu-model');
var layout_model_1 = require('./models/layout-model');
var layout_1 = require('./views/layout');
var Initialiser = (function () {
    function Initialiser() {
        this._menuJSONPath = './menu.json';
    }
    Initialiser.prototype.init = function () {
        var _this = this;
        var initPromise = new Promise(function (resolve, reject) {
            $.ajax({
                url: _this._menuJSONPath,
                method: 'GET',
                contentType: 'application/json'
            })
                .then(function (data) {
                var menu = new menu_model_1.MenuModel({
                    items: data
                });
                var model = new layout_model_1.LayoutModel({
                    menu: menu
                });
                _this._view = new layout_1.LayoutView({
                    el: $('div#app'),
                    model: model
                });
                resolve(true);
            })
                .fail(function () {
                resolve(false);
            });
        });
        return initPromise;
    };
    Initialiser.prototype.renderLayout = function () {
        this._view.render();
    };
    return Initialiser;
}());
exports.Initialiser = Initialiser;
