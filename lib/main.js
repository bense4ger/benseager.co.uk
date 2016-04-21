"use strict";
var initialiser_1 = require('./initialiser');
$('document').ready(function () {
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
