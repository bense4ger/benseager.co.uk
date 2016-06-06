/// <reference path="../../typings/main.d.ts" />
import { CookieConsentView } from '../views/cookie-consent-view';

export class CookieConsent{
    private COOKIE_NAME: string = 'benseager_consent';
    private _consented: boolean;
    private _view: CookieConsentView;
    
    constructor(){
        this._checkForConsent();
    }
    
    public get consented(): boolean{
        return  this._consented;
    }
    
    private _checkForConsent(): void {
        this._consented = document.cookie.split(';').indexOf(this.COOKIE_NAME) >= 0;
    }
    
    public initialiseConsent(): void {
        this._view = new CookieConsentView();
        this._view.$el = $('div#cookie-consent');
        this._view.render().transitionIn();
    }
}