///<reference path="../../typings/main.d.ts" />
export function recaptchaLoad(){
    let el = <HTMLElement>document.getElementsByClassName('g-recaptcha')[0]; 
    grecaptcha.render(el, { sitekey: '6LezDh4TAAAAAHSemQNOAK8pfm6FaqIjqSLzjWVS' });
}