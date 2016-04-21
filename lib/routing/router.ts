///<reference path="../../typings/main.d.ts" />
import { IMenuItem } from './IMenuItem';
import { Reflector } from '../utils/reflector';

export class Router extends Backbone.Router{
    
}

export function bootstrapRouter(router: Router, routeData: Array<IMenuItem>): void {
    _.each(routeData, (rd) => {
        (<any>router).prototype[rd.name.toLowerCase()] = () => {
            let viewName = `${rd.name}View`;
            let view = Reflector.createNewInstance(viewName);
            (<any>view).render();
        };
    });
}