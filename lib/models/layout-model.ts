///<reference path="../../typings/main.d.ts" />
import { MenuModel } from './menu-model';

export class LayoutModel extends Backbone.Model{
        defaults(): Backbone.ObjectHash {
            return {
                menu: new MenuModel()
            }
        }
        
        public get menu() : MenuModel {
            return  this.get('menu');
        }
}

