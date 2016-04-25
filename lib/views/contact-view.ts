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
        
        ContactHelper.showLoader();
        
        ContactHelper.recaptchaSubmit()
            .then((res) => {
                if(res){
                    ContactHelper.formSubmit()
                        .then((res) => {
                            ContactHelper.hideLoader();
                            ContactHelper.submitSuccess();
                            this.reset(e);
                        })
                        .catch((err) => {
                            ContactHelper.hideLoader();
                            ContactHelper.submitFailure();
                        });
                }
                else{
                    ContactHelper.hideLoader();
                    ContactHelper.submitFailure();
                }
            })
            .catch((err) => {
                ContactHelper.hideLoader();
                ContactHelper.submitFailure();
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