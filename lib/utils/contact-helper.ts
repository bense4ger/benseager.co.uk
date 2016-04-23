///<reference path="../../typings/main.d.ts" />
export class ContactHelper {
    private static RECAPTCHA_URL: string = 'https://www.google.com/recaptcha/api/siteverify';
    private static SUBMIT_URL: string = 'http://formspree.io/hello@benseager.co.uk';
    
    public static recaptchaSubmit(): Promise<boolean>{
        let recaptchaPromise = new Promise((resolve, reject) => {
            resolve(true);
        });
        /*let recaptchaPromise = new Promise((resolve, reject) => {
            let response = (<HTMLTextAreaElement>document.getElementById('g-recaptcha-response')).value;
            if(!response){
                reject('No recaptcha');
            }
            
            let recaptchaData = {
                secret: '',
                response: response 
            };
            
            $.ajax({
                url: this.RECAPTCHA_URL,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8080'
                },
                method: 'POST',
                dataType: 'json',
                data: recaptchaData
            })
            .then((data) => {
                resolve(data.success);
            })
            .fail(() => {
                resolve(false);
            });
        });*/
        
        return recaptchaPromise;
    }
    
    public static formSubmit(): Promise<boolean> {
        let submitPromise = new Promise((resolve, reject) => {
            let form = <HTMLFormElement>document.getElementById('contact-form');
            let formData = new FormData(form);
            
            $.ajax({
                url: this.SUBMIT_URL,
                method: 'POST',
                dataType: 'json',
                data: JSON.stringify(formData)
            })  
            .then((data) => {
                resolve(true);
            })
            .fail(() => {
                reject('Form not submitted');
            });
        });
        
        return submitPromise;
    }
}