/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var Backbone = require('backbone'),
    IndexView = require('./views/index/index-view'),
    ContactView = require('./views/contact/contact-view');

var Router = Backbone.Router.extend({
    routes:{
        '' : 'index',
        'services' : 'services',
        'contact' : 'contact',
        'post/:id' : 'fullPost'
    },

    index: function () {
        let view = new IndexView();
        view.render();
    },

    fullPost: function (id) {

    },

    services: function () {

    },

    contact: function () {
        let view = new ContactView();
        view.render();
    }
});

module.exports = Router;