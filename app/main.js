'use strict';
var $ = require('jquery'),
    Backbone = require('backbone'),
    Router = require('./router');

//Document Ready type things
$(document).ready(() => {
    var router = new Router();
    Backbone.history.start();

    //$('input[type="submit"]').click(() => { return false; });
});