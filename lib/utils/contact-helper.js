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
                dataType: 'json',
            })
                .then(function (data, textStatus, xhr) {
                xhr.status === 200
                    ? resolve(true)
                    : resolve(false);
            })
                .fail(function () {
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
                data: JSON.stringify(formData)
            })
                .then(function (data) {
                resolve(true);
            })
                .fail(function () {
                reject('Form not submitted');
            });
        });
        return submitPromise;
    };
    ContactHelper.VERIFY_URL = 'http://api-benseager.azurewebsites.net/recaptcha-verification';
    ContactHelper.SUBMIT_URL = 'http://formspree.io/hello@benseager.co.uk';
    return ContactHelper;
}());
exports.ContactHelper = ContactHelper;
