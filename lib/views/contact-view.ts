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
        
        this.pageView('contact', '/#contact');
        
        return this;
    }
    
    private recaptchQuickCheck(): boolean {
        let recaptcha = document.getElementsByTagName('iframe')[0];
        recaptcha.className = '';
        
        let recaptchaVal = (<HTMLTextAreaElement>document.getElementById('g-recaptcha-response')).value;
        if(!recaptchaVal){
            recaptcha.className += 'warn-pulse';
            return false;
        }
        
        return true;
    }
    
    private submit(e: JQueryEventObject): void {
        e.preventDefault();
        if(!this.recaptchQuickCheck()) return;
        
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