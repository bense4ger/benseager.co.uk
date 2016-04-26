///<reference path="../../typings/main.d.ts" />
import { gaPageView } from '../utils/ga-helper';

class StaticModel extends Backbone.Model {}
export class StaticView extends Backbone.View<StaticModel>{
    initialize(): void {
        this.$el = $('section#content');
    }
    
    public pageView(pageName: string, route: string): void {
        gaPageView(pageName, route);
    }
}