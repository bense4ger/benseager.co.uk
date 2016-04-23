///<reference path="../../typings/main.d.ts" />
import { ContactHelper } from '../utils/contact-helper';
import { StaticView } from './static-view';
import Template = require('../templates/contact.hbs');

export class ContactView extends StaticView{
    
    public events(): Backbone.EventsHash {
        return {
            'submit #contact-form': 'submit',
            'click #reset': 'reset'
        };
    }
    
    public render(): ContactView {
        let template = <any>Handlebars.compile(Template());
        let html = template();
            
        this.$el.html(html);
        
        this.delegateEvents();
        
        return this;
    }
    
    private submit(e: JQueryEventObject): void {
        e.preventDefault();
        
        ContactHelper.recaptchaSubmit()
            .then((res) => {
                if(res){
                    ContactHelper.formSubmit()
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((err) => {
                            //TODO: Clean this up!
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                //TODO: Clean this up!
                console.error(err);
            });
    }
    
    private reset(e: JQueryEventObject): void {
        e.preventDefault();
        let controls = document.getElementById('contact-form').querySelectorAll('input[type="text"], textarea');
        _.each(controls, (c: HTMLInputElement | HTMLTextAreaElement) => {
            c.value = '';
        });
        grecaptcha.reset();
    }
}