"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var contact_helper_1 = require('../utils/contact-helper');
var static_view_1 = require('./static-view');
var Template = require('../templates/contact.hbs');
var ContactView = (function (_super) {
    __extends(ContactView, _super);
    function ContactView() {
        _super.apply(this, arguments);
    }
    ContactView.prototype.events = function () {
        return {
            'submit #contact-form': 'submit',
            'click #reset': 'reset'
        };
    };
    ContactView.prototype.render = function () {
        var template = Handlebars.compile(Template());
        var html = template();
        this.$el.html(html);
        this.delegateEvents();
        this.pageView('contact', '/#contact');
        return this;
    };
    ContactView.prototype.recaptchQuickCheck = function () {
        var recaptcha = document.getElementsByTagName('iframe')[0];
        recaptcha.className = '';
        var recaptchaVal = document.getElementById('g-recaptcha-response').value;
        if (!recaptchaVal) {
            recaptcha.className += 'warn-pulse';
            return false;
        }
        return true;
    };
    ContactView.prototype.submit = function (e) {
        var _this = this;
        e.preventDefault();
        if (!this.recaptchQuickCheck())
            return;
        contact_helper_1.ContactHelper.showLoader();
        contact_helper_1.ContactHelper.recaptchaSubmit()
            .then(function (res) {
            if (res) {
                contact_helper_1.ContactHelper.formSubmit()
                    .then(function (res) {
                    contact_helper_1.ContactHelper.hideLoader();
                    contact_helper_1.ContactHelper.submitSuccess();
                    _this.reset(e);
                })
                    .catch(function (err) {
                    contact_helper_1.ContactHelper.hideLoader();
                    contact_helper_1.ContactHelper.submitFailure();
                });
            }
            else {
                contact_helper_1.ContactHelper.hideLoader();
                contact_helper_1.ContactHelper.submitFailure();
            }
        })
            .catch(function (err) {
            contact_helper_1.ContactHelper.hideLoader();
            contact_helper_1.ContactHelper.submitFailure();
        });
    };
    ContactView.prototype.reset = function (e) {
        e.preventDefault();
        var controls = document.getElementById('contact-form').querySelectorAll('input[type="text"], textarea');
        _.each(controls, function (c) {
            c.value = '';
        });
        grecaptcha.reset();
    };
    return ContactView;
}(static_view_1.StaticView));
exports.ContactView = ContactView;
