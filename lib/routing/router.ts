///<reference path="../../typings/main.d.ts" />
import { IMenuItem } from './IMenuItem';
import { Reflector } from '../utils/reflector';

export class Router extends Backbone.Router{
     
}

export function bootstrapMenuRoutes(router: Router, routeData: Array<IMenuItem>): void {
    router['routes'] = {};
    
    _.each(routeData, (rd) => {
        router.routes[rd.route] = rd.name.toLowerCase();
         
        (<any>router)[rd.name.toLowerCase()] = (): void => {
            let viewName = `${rd.name}View`;
            let view = Reflector.createNewInstance(viewName);
            (<any>view).render();
        };
    });
    (<any>router)._bindRoutes();
}