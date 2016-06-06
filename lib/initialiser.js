"use strict";
var Routing = require('./routing/router');
var menu_model_1 = require('./models/menu-model');
var layout_model_1 = require('./models/layout-model');
var layout_1 = require('./views/layout');
var small_menu_view_1 = require('./views/small-menu-view');
var cookie_consent_1 = require('./utils/cookie-consent');
var Initialiser = (function () {
    function Initialiser() {
        this._menuJSONPath = './menu.json';
        this._cookieConsent = new cookie_consent_1.CookieConsent();
    }
    Initialiser.prototype.initLayout = function () {
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
                _this._smallMenu = new small_menu_view_1.SmallMenuView({
                    el: $('div#small-menu'),
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
        var _this = this;
        var renderPromise = new Promise(function (resolve, reject) {
            try {
                _this._smallMenu.render();
                _this._view.render();
                if (!_this._cookieConsent.consented) {
                    _this._cookieConsent.initialiseConsent();
                }
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
        return renderPromise;
    };
    Initialiser.prototype.initRouter = function () {
        var _this = this;
        var routerPromise = new Promise(function (resolve, reject) {
            $.ajax({
                url: _this._menuJSONPath,
                method: 'GET',
                contentType: 'application/json'
            })
                .then(function (data) {
                _this._router = new Routing.Router();
                Routing.bootstrapMenuRoutes(_this._router, data);
                resolve(true);
            })
                .fail(function () {
                resolve(false);
            });
        });
        return routerPromise;
    };
    return Initialiser;
}());
exports.Initialiser = Initialiser;
