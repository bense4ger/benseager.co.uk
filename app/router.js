/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var Backbone = require('backbone'),
    ContactView = require('./views/contact-view');

var Router = Backbone.Router.extend({
    routes:{
        '' : 'index',
        ':id' : 'fullPost',
        'services' : 'services',
        'contact' : 'contact'
    },

    /*initialize: function (opts) {

    },*/

    index: function () {
        alert();
    },

    fullPost: function (id) {
        alert(id);
    },

    services: function () {

    },

    contact: function () {
        var view = new ContactView(this.el);
        view.render();
    }
});

module.exports = Router;