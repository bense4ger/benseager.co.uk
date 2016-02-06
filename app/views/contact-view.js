/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    template = require('./contact-view.hbs');

var ContactView = Backbone.View.extend({
    render: function () {
        var html = template();
        this.$el.html(html);
    }
});

module.exports = ContactView;