///<reference path="../../typings/main.d.ts" />
import { LayoutModel } from '../models/layout-model';
import Template = require('../templates/small-menu.hbs');

export class SmallMenuView extends Backbone.View<LayoutModel>{
    public events(): Backbone.EventsHash {
        return {
            'click a.small-menu-link': 'closeMenu'
        };
    }
    
    render(): SmallMenuView {
        let menuItems = this.model.menu.items;
        let template = <any>Handlebars.compile(Template({
            menuItems: menuItems
        }));
        let html = template();
        
        this.$el.html(html);
        
        this.delegateEvents();
        return this;      
    }
    
    private closeMenu(): void {
        setTimeout(() => {
            (<any>$('div#off-canvas')).foundation('close');
        }, 150);
    }
}