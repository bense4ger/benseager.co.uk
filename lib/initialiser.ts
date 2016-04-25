///<reference path="../typings/main.d.ts" />
import * as Routing from './routing/router';
import {  MenuModel } from './models/menu-model';
import { LayoutModel } from './models/layout-model';
import { LayoutView } from './views/layout';
import { SmallMenuView } from './views/small-menu-view';

export class Initialiser{
    private _menuJSONPath: string = './menu.json';
    private _view: LayoutView;
    private _smallMenu: SmallMenuView;
    private _router: Routing.Router;
    
    constructor(){}
    
    public initLayout(): Promise<boolean>{
        let initPromise = new Promise((resolve, reject) => {
            $.ajax({
                url: this._menuJSONPath,
                method: 'GET',
                contentType: 'application/json'
            })
            .then((data) => {
                let menu = new MenuModel({
                    items: data
                });
                
                let model = new LayoutModel({
                    menu: menu
                });
                
                this._view = new LayoutView({
                    el: $('div#app'),
                    model: model
                });
                
                this._smallMenu = new SmallMenuView({
                    el: $('div#small-menu'),
                    model: model
                });
                
                resolve(true);
            })
            .fail(() => {
                resolve(false);
            })
        });
        
        return initPromise;
    }
    
    public renderLayout(): Promise<boolean> {
        let renderPromise = new Promise((resolve, reject) => {
            try{
                this._smallMenu.render();
                this._view.render();
                resolve(true);
            }
            catch(err){
                reject(err);
            }
        });
        return renderPromise;
    }
    
    public initRouter(): Promise<boolean> {
        let routerPromise = new Promise((resolve, reject) => {
            $.ajax({
                url: this._menuJSONPath,
                method: 'GET',
                contentType: 'application/json'
            })
            .then((data) => {
                this._router = new Routing.Router();
                Routing.bootstrapMenuRoutes(this._router, data);
                
                resolve(true);
            })
            .fail(() => {
                resolve(false);
            });
        });
        return routerPromise;
    }
}