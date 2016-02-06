/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var Backbone = require('backbone'),
    ContactView = require('./views/contact-view');

var Router = Backbone.Router.extend({
    routes:{
        '' : 'index',
        'services' : 'services',
        'contact' : 'contact',
        'post/:id' : 'fullPost'
    },

    index: function () {

    },

    fullPost: function (id) {

    },

    services: function () {

    },

    contact: function () {
        var view = new ContactView();
        view.render();
    }
});

module.exports = Router;