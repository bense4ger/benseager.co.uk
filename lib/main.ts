///<reference path="../typings/main.d.ts" />
import { Initialiser } from './initialiser';

//Initialise the app
$('document').ready(() => {
    let i = new Initialiser();
    i.init().then((result) => {
        if(result === true){
            i.renderLayout();
        }
    }).catch((err) => {
        console.log(err);
    });
});

//Initialise Foundation
(<any>$(document)).foundation();