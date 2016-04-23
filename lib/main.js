"use strict";
var recaptcha_1 = require('./utils/recaptcha');
var initialiser_1 = require('./initialiser');
$('document').ready(function () {
    window['recaptchaLoad'] = recaptcha_1.recaptchaLoad;
    var i = new initialiser_1.Initialiser();
    i.initLayout().then(function (result) {
        if (result === true) {
            i.renderLayout().then(function (result) {
                i.initRouter().then(function (result) {
                    Backbone.history.start();
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
$(document).foundation();
