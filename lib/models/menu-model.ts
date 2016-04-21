///<reference path="../../typings/main.d.ts" />
import { IMenuItem } from '../routing/IMenuItem';

export class MenuModel extends Backbone.Model{
    public defaults(): Backbone.ObjectHash {
        return {
            items: [
                {name: 'Home', route: '/'},
                {name: 'Build', route: 'build'},
                {name: 'Contact', route: 'contact'},
            ]
        }
    }
    
    public get items(): Array<IMenuItem> {
        return this.get('items');
    } 
}