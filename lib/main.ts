///<reference path="../typings/main.d.ts" />
import * as Vue from 'vue';
const app = require('./app.vue');

new Vue({
    el: 'body',
    components:{
        app: app
    }
});
