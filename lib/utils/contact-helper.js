"use strict";
var ContactHelper = (function () {
    function ContactHelper() {
    }
    ContactHelper.recaptchaSubmit = function () {
        var _this = this;
        var recaptchaPromise = new Promise(function (resolve, reject) {
            var response = document.getElementById('g-recaptcha-response').value;
            if (!response) {
                reject('No recaptcha');
            }
            $.ajax({
                url: _this.VERIFY_URL + "/" + response,
                method: 'GET',
                dataType: 'text',
            })
                .then(function (data, textStatus, xhr) {
                xhr.status === 200
                    ? resolve(true)
                    : resolve(false);
            })
                .fail(function (xhr, textStatus, err) {
                resolve(false);
            });
        });
        return recaptchaPromise;
    };
    ContactHelper.formSubmit = function () {
        var _this = this;
        var submitPromise = new Promise(function (resolve, reject) {
            var form = document.getElementById('contact-form');
            var formData = {
                name: form.querySelectorAll('input[name="name"]')[0].value,
                email: form.querySelectorAll('input[name="email"]')[0].value,
                message: form.querySelectorAll('textarea[name="message"]')[0].value
            };
            $.ajax({
                url: _this.SUBMIT_URL,
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(formData)
            })
                .then(function (data) {
                resolve(true);
            })
                .fail(function (xhr, textStatus, err) {
                reject("Form not submitted " + textStatus);
            });
        });
        return submitPromise;
    };
    Object.defineProperty(ContactHelper, "form", {
        get: function () {
            if (ContactHelper._form !== undefined) {
                return ContactHelper._form;
            }
            else {
                ContactHelper._form = $('form#contact-form');
                return ContactHelper._form;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactHelper, "loading", {
        get: function () {
            if (ContactHelper._loading !== undefined) {
                return ContactHelper._loading;
            }
            else {
                ContactHelper._loading = $('div#contact-loading');
                return ContactHelper._loading;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactHelper, "success", {
        get: function () {
            if (ContactHelper._success !== undefined) {
                return ContactHelper._success;
            }
            else {
                ContactHelper._success = $('div#contact-success');
                return ContactHelper._success;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactHelper, "failure", {
        get: function () {
            if (ContactHelper._failure !== undefined) {
                return ContactHelper._failure;
            }
            else {
                ContactHelper._failure = $('div#contact-failure');
                return ContactHelper._failure;
            }
        },
        enumerable: true,
        configurable: true
    });
    ContactHelper.showLoader = function () {
        ContactHelper.form.addClass('hidden');
        setTimeout(function () {
            ContactHelper.form.hide();
            ContactHelper.loading.show();
            ContactHelper.loading.addClass('visible');
        }, 300);
    };
    ContactHelper.hideLoader = function () {
        ContactHelper.loading.removeClass('visible');
        setTimeout(function () {
            ContactHelper.loading.hide();
        }, 300);
    };
    ContactHelper.submitSuccess = function () {
        ContactHelper.success.show();
        ContactHelper.success.addClass('visible');
        setTimeout(function () {
            ContactHelper.success.removeClass('visible');
            setTimeout(function () {
                ContactHelper.success.hide();
                ContactHelper.form.show();
                ContactHelper.form.removeClass('hidden');
            }, 300);
        }, 2500);
    };
    ContactHelper.submitFailure = function () {
        ContactHelper.failure.show();
        ContactHelper.failure.addClass('visible');
        setTimeout(function () {
            ContactHelper.failure.removeClass('visible');
            setTimeout(function () {
                ContactHelper.failure.hide();
                ContactHelper.form.show();
                ContactHelper.form.removeClass('hidden');
            }, 300);
        }, 2500);
    };
    ContactHelper.VERIFY_URL = 'http://api-benseager.azurewebsites.net/recaptcha-verification';
    ContactHelper.SUBMIT_URL = 'http://formspree.io/hello@benseager.co.uk';
    return ContactHelper;
}());
exports.ContactHelper = ContactHelper;
