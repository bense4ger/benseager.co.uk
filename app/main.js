'use strict';
var $ = require('jquery'),
    Backbone = require('backbone'),
    Router = require('./router');

//Document Ready type things
$(document).ready(function (){
    var router = new Router({
        el: $('#content')
    });
    Backbone.history.start({
        pushState: true,
        root: '/'
    });
});
