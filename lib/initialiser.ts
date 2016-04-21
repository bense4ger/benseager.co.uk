///<reference path="../typings/main.d.ts" />
import {  MenuModel } from './models/menu-model';
import { LayoutModel } from './models/layout-model';
import { LayoutView } from './views/layout';

export class Initialiser{
    private _menuJSONPath: string = './menu.json';
    private _view: LayoutView;
    
    constructor(){}
    
    public init(): Promise<boolean>{
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
                
                resolve(true);
            })
            .fail(() => {
                resolve(false);
            })
        });
        
        return initPromise;
    }
    
    public renderLayout():void{
        this._view.render();
    }
}