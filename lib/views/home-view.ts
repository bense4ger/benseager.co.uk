///<reference path="../../typings/main.d.ts" />
import { StaticView } from './static-view';
import Template = require('../templates/home.hbs');
export class HomeView extends StaticView {
    public render(): HomeView{
        let template = <any>Handlebars.compile(Template());
        let html = template();
        
        this.$el.html(html);
        
        return this;
    }
}