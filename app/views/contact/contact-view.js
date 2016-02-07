/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var $ = require('jquery'),
    Backbone = require('backbone'),
    template = require('./contact-view.hbs');

var ContactView = Backbone.View.extend({
    el: '#content',

    events:{
        'submit #contact-form' : 'submit'
    },

    initialize: function (attrs) {

    },

    render: function () {
        var html = template();
        this.$el.append(html);
        return this;
    }
});

module.exports = ContactView;