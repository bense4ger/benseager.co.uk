"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var static_view_1 = require('./static-view');
var cookie_consent_1 = require('../utils/cookie-consent');
var Template = require('../templates/cookie-consent.hbs');
var CookieConsentView = (function (_super) {
    __extends(CookieConsentView, _super);
    function CookieConsentView() {
        _super.apply(this, arguments);
    }
    CookieConsentView.prototype.events = function () {
        return {
            'click #cookie-accept': 'cookieAccept'
        };
    };
    CookieConsentView.prototype.render = function () {
        var template = Handlebars.compile(Template());
        var html = template();
        this.$el.html(html);
        this.delegateEvents();
        return this;
    };
    CookieConsentView.prototype.transitionIn = function () {
        document.getElementById('cookie-consent').className = '';
    };
    CookieConsentView.prototype.transitionOut = function () {
        document.getElementById('cookie-consent').className += 'thin';
    };
    CookieConsentView.prototype.cookieAccept = function () {
        cookie_consent_1.CookieConsent.dropCookie();
        this.transitionOut();
    };
    return CookieConsentView;
}(static_view_1.StaticView));
exports.CookieConsentView = CookieConsentView;
