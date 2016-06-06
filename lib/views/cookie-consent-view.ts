///<reference path="../../typings/main.d.ts" />
import { StaticView } from './static-view';
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
        //document.getElementById('div#cookie-consent').style.display = 'block';
        document.getElementById('cookie-consent').className = '';
    }
    
    public transitionOut(): void {
        $('div#cookie-consent').addClass('thin');
        /*setTimeout(() => {
            document.getElementById('div#cookie-consent').style.display = 'none';
        }, 300);*/
    }
    
    private cookieAccept(): void {
        this.transitionOut();
    }
}