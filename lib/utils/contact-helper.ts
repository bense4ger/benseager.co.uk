///<reference path="../../typings/main.d.ts" />
export class ContactHelper {
    private static VERIFY_URL: string = 'http://api-benseager.azurewebsites.net/recaptcha-verification'; 
    private static SUBMIT_URL: string = 'http://formspree.io/hello@benseager.co.uk';
    
    public static recaptchaSubmit(): Promise<boolean>{
        let recaptchaPromise = new Promise((resolve, reject) => {
            let response = (<HTMLTextAreaElement>document.getElementById('g-recaptcha-response')).value;
            if(!response){
                reject('No recaptcha');
            }
            
            $.ajax({
                url: `${this.VERIFY_URL}/${response}`,
                method: 'GET',
                dataType: 'json',
            })
            .then((data, textStatus, xhr) => {
                xhr.status === 204 
                    ? resolve(true)
                    : resolve(false);
            })
            .fail(() => {
                resolve(false);
            });
        });
        
        return recaptchaPromise;
    }
    
    public static formSubmit(): Promise<boolean> {
        let submitPromise = new Promise((resolve, reject) => {
            let form = <HTMLFormElement>document.getElementById('contact-form');
            let formData = {
                name: (<HTMLInputElement>form.querySelectorAll('input[name="name"]')[0]).value,
                email: (<HTMLInputElement>form.querySelectorAll('input[name="email"]')[0]).value,
                message: (<HTMLTextAreaElement>form.querySelectorAll('textarea[name="message"]')[0]).value
            };
            
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