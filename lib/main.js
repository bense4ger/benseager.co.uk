"use strict";
var initialiser_1 = require('./initialiser');
$('document').ready(function () {
    var i = new initialiser_1.Initialiser();
    i.init().then(function (result) {
        if (result === true) {
            i.renderLayout();
        }
    }).catch(function (err) {
        console.log(err);
    });
});
$(document).foundation();
