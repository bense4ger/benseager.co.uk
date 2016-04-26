/// <reference path="../../typings/main.d.ts" />
import { StaticView } from './static-view';
import Template = require('../templates/build.hbs');
export class BuildView extends StaticView {
    public render(): BuildView {
        let template = <any>Handlebars.compile(Template());
        let html = template();
        
        this.$el.html(html);
        
        this.pageView('build', '/#build');
        
        return this;
    }
}