"use strict";
var Reflector = (function () {
    function Reflector() {
    }
    Reflector.createNewInstance = function (className) {
        var _this = this;
        var cls = eval(className);
        var f = function () {
            return cls.apply(_this);
        };
        f.prototype = cls.prototype;
        return new f();
    };
    return Reflector;
}());
exports.Reflector = Reflector;
