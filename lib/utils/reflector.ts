export class Reflector{
    public static createNewInstance<T>(className: string): T {
        let cls = eval(className);
        let f: any = (): any => {
            return cls.apply(this);
        };
        
        f.prototype = cls.prototype;
        return new f();
    } 
}