"use strict";
var ContactHelper = (function () {
    function ContactHelper() {
    }
    ContactHelper.recaptchaSubmit = function () {
        var recaptchaPromise = new Promise(function (resolve, reject) {
            resolve(true);
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
            console.log(formData);
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
    ContactHelper.RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';
    ContactHelper.SUBMIT_URL = 'http://formspree.io/hello@benseager.co.uk';
    return ContactHelper;
}());
exports.ContactHelper = ContactHelper;
