"use strict";
const Vue = require('vue');
const app = require('./app.vue');
new Vue({
    el: 'body',
    components: {
        app: app
    }
});
