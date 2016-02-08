/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var $ = require('jquery'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars');

var IndexView = Backbone.View.extend({
    el: '#content',

    initialize: function () {

    },

    render: function () {
        let template = Handlebars.compile(require('./index-view.hbs')());
        //this.$el = $('#content');
        let html = template();

        this.$el.html(html);
        return this;
    }
});

module.exports = IndexView;