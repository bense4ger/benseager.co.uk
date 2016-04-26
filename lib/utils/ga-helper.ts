declare var ga: any;
export function gaPageView(pageName: string, route: string): void{
    ga('set', pageName, route);
    ga('send', 'pageview');
}