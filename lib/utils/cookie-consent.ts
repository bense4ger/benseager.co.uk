/// <reference path="../../typings/main.d.ts" />
import { CookieConsentView } from '../views/cookie-consent-view';
const COOKIE_NAME: string = 'benseager_consent';

export class CookieConsent{
    private _consented: boolean;
    private _view: CookieConsentView;
    
    constructor(){
        this._checkForConsent();
    }
    
    public get consented(): boolean{
        return this._consented;
    }
    
    private _checkForConsent(): void {
        let cookieNames = _.map(document.cookie.split(';'), (c) => { return c.split('=')[0]; });
        this._consented = cookieNames.indexOf(` ${COOKIE_NAME}`) >= 0 || cookieNames.indexOf(COOKIE_NAME) >= 0;
    }
    
    public initialiseConsent(): void {
        this._view = new CookieConsentView();
        this._view.$el = $('div#cookie-consent');
        this._view.render().transitionIn();
    }
    
    public static dropCookie(): void {
        document.cookie = `${COOKIE_NAME}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
}