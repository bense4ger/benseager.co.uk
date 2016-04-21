///<reference path="../../typings/main.d.ts" />
class StaticModel extends Backbone.Model {}
export class StaticView extends Backbone.View<StaticModel>{
    initialize(): void {
        this.$el = $('section#content');
    }
}