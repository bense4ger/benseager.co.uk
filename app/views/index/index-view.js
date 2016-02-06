/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var $ = require('jquery'),
    Backbone = require('backbone'),
    template = require('./index-view.hbs');

var IndexView = Backbone.View.extend({
    render: function () {
        this.$el = $('#content');
        let html = template();

        this.$el.html(html);
        return this;
    }
});

module.exports = IndexView;