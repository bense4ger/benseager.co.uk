///<reference path="../../typings/main.d.ts" />
import { LayoutModel } from '../models/layout-model';
import Template = require('../templates/layout.hbs');

export class LayoutView extends Backbone.View<LayoutModel>{
    render(): LayoutView {
        let menuItems = this.model.menu.items;
        let template = <any>Handlebars.compile(Template({
            menuItems: menuItems
        }));
        let html = template();
        
        this.$el.html(html);
        
        return this;
    }
}