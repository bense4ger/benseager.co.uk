///<reference path="../typings/main.d.ts" />
import { Initialiser } from './initialiser';

//Initialise the app
$('document').ready(() => {
    let i = new Initialiser();
    i.initLayout().then((result) => {
        if(result === true){
            i.renderLayout().then((result) => {
                i.initRouter().then((result) => {
                    Backbone.history.start();
                });
            }).catch((err) => {
                console.log(err);
            });            
        }
    }).catch((err) => {
        console.log(err);
    });
});

//Initialise Foundation
(<any>$(document)).foundation();