import { GAC } from './gac';
export class Reflector{
    public static createNewInstance<T>(className: string): T {
        let cls: any = GAC[className];
        return new cls();
    } 
}