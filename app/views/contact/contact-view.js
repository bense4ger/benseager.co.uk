/**
 * Created by benseager on 06/02/2016.
 */
'use strict';
var $ = require('jquery'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars');

var ContactView = Backbone.View.extend({
    el: '#content',

    events:{
        'submit #contact-form' : 'submit'
    },

    initialize: function (attrs) {

    },

    render: function () {
        let template = Handlebars.compile(require('./contact-view.hbs')());
        let html = template();
        this.$el.html(html);
        return this;
    },

    submit: function (e) {
        e.preventDefault();
        let $form = $(e.currentTarget);
        let data = $form.serialize();

        if(data._gotcha !== undefined) return;

        let $thanks = $('p#thanks');
        let $loader = $('i#loading');
        let $error = $('i#error');

        $form.hide();
        $loader.show();

        $.ajax({
            url: "//formspree.io/hello@benseager.co.uk",
            method: "POST",
            data: data,
            dataType: "json",
            success: () => {
                $loader.hide();
                $form.trigger('reset');
                $thanks.show();
            },
            error: () => {
                $loader.hide();
                $error.show();
            }
        });
    }
});

module.exports = ContactView;