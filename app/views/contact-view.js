/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var $ = require('jquery'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    template = require('./contact-view.hbs');

var ContactView = Backbone.View.extend({
    initialize: function (attrs) {
        this.$el = $('#content');
    },

    render: function () {
        var html = template();
        this.$el.html(html);

        return this;
    }
});

module.exports = ContactView;