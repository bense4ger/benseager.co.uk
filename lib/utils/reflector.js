"use strict";
var gac_1 = require('./gac');
var Reflector = (function () {
    function Reflector() {
    }
    Reflector.createNewInstance = function (className) {
        var cls = gac_1.GAC[className];
        return new cls();
    };
    return Reflector;
}());
exports.Reflector = Reflector;
