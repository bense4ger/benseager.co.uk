"use strict";
var cookie_consent_view_1 = require('../views/cookie-consent-view');
var COOKIE_NAME = 'benseager_consent';
var CookieConsent = (function () {
    function CookieConsent() {
        this._checkForConsent();
    }
    Object.defineProperty(CookieConsent.prototype, "consented", {
        get: function () {
            return this._consented;
        },
        enumerable: true,
        configurable: true
    });
    CookieConsent.prototype._checkForConsent = function () {
        var cookieNames = _.map(document.cookie.split(';'), function (c) { return c.split('=')[0]; });
        this._consented = cookieNames.indexOf(" " + COOKIE_NAME) >= 0;
    };
    CookieConsent.prototype.initialiseConsent = function () {
        this._view = new cookie_consent_view_1.CookieConsentView();
        this._view.$el = $('div#cookie-consent');
        this._view.render().transitionIn();
    };
    CookieConsent.dropCookie = function () {
        document.cookie = COOKIE_NAME + "=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    };
    return CookieConsent;
}());
exports.CookieConsent = CookieConsent;
