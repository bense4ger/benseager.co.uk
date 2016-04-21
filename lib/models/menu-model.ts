///<reference path="../../typings/main.d.ts" />
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
}