///<reference path="../../typings/main.d.ts" />
import { StaticView } from './static-view';
import { CookieConsent } from '../utils/cookie-consent';
var Template = require('../templates/cookie-consent.hbs');

export class CookieConsentView extends StaticView{
    public events(): Backbone.EventsHash {
        return {
            'click #cookie-accept': 'cookieAccept'
        };
    }
    
    public render(): CookieConsentView {
        let template = <any>Handlebars.compile(Template());
        let html = template();
        
        this.$el.html(html);
        
        this.delegateEvents();
        
        return this;
    }
    
    public transitionIn(): void {
        document.getElementById('cookie-consent').className = '';
    }
    
    public transitionOut(): void {
        document.getElementById('cookie-consent').className += 'thin';
    }
    
    private cookieAccept(): void {
        CookieConsent.dropCookie();
        this.transitionOut();
    }
}