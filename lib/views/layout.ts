///<reference path="../../typings/main.d.ts" />
import { LayoutModel } from '../models/layout-model';
import Template = require('../templates/layout.hbs');

export class LayoutView extends Backbone.View<LayoutModel>{
    public events(): Backbone.EventsHash {
        return {
            'click i#hamburger': 'openCanvas'
        };
    }

    render(): LayoutView {
        let menuItems = this.model.menu.items;
        let template = <any>Handlebars.compile(Template({
            menuItems: menuItems
        }));
        let html = template();
        
        this.$el.html(html);
        this.delegateEvents();

        return this;
    }

    private openCanvas(): void {
        (<any>$('div#off-canvas')).foundation('open');
    }

}