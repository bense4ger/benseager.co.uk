"use strict";
var cookie_consent_view_1 = require('../views/cookie-consent-view');
var CookieConsent = (function () {
    function CookieConsent() {
        this.COOKIE_NAME = 'benseager_consent';
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
        this._consented = document.cookie.split(';').indexOf(this.COOKIE_NAME) >= 0;
    };
    CookieConsent.prototype.initialiseConsent = function () {
        this._view = new cookie_consent_view_1.CookieConsentView();
        this._view.$el = $('div#cookie-consent');
        this._view.render().transitionIn();
    };
    return CookieConsent;
}());
exports.CookieConsent = CookieConsent;
