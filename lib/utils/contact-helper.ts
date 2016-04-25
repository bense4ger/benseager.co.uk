///<reference path="../../typings/main.d.ts" />
export class ContactHelper {
    private static VERIFY_URL: string = 'http://api-benseager.azurewebsites.net/recaptcha-verification'; 
    private static SUBMIT_URL: string = 'http://formspree.io/hello@benseager.co.uk';
    
    private static _form: JQuery;
    private static _loading: JQuery;
    private static _success: JQuery;
    private static _failure: JQuery;
    
    public static recaptchaSubmit(): Promise<boolean>{
        let recaptchaPromise = new Promise((resolve, reject) => {
            let response = (<HTMLTextAreaElement>document.getElementById('g-recaptcha-response')).value;
            if(!response){
                reject('No recaptcha');
            }
            
            $.ajax({
                url: `${this.VERIFY_URL}/${response}`,
                method: 'GET',
                dataType: 'text',
            })
            .then((data, textStatus, xhr) => {
                xhr.status === 200 
                    ? resolve(true)
                    : resolve(false);
            })
            .fail((xhr, textStatus, err) => {
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
                contentType: 'application/json',
                data: JSON.stringify(formData)
            })  
            .then((data) => {
                resolve(true);
            })
            .fail((xhr, textStatus, err) => {
                reject(`Form not submitted ${textStatus}`);
            });
        });
        
        return submitPromise;
    }
    
    private static get form(): JQuery {
        if(ContactHelper._form !== undefined){
            return ContactHelper._form;
        }
        else{
            ContactHelper._form = $('form#contact-form');
            return ContactHelper._form;
        }
    }
    
    private static get loading(): JQuery {
        if(ContactHelper._loading !== undefined){
            return ContactHelper._loading;
        }
        else{
            ContactHelper._loading = $('div#contact-loading');
            return ContactHelper._loading;
        }
    }
    
    private static get success(): JQuery {
        if(ContactHelper._success !== undefined) {
            return ContactHelper._success;
        }
        else{
            ContactHelper._success = $('div#contact-success');
            return ContactHelper._success;
        }
    }
    
    private static get failure(): JQuery {
        if(ContactHelper._failure !== undefined){
            return ContactHelper._failure;
        }
        else{
            ContactHelper._failure = $('div#contact-failure');
            return ContactHelper._failure;
        }
    }
    
    public static showLoader(): void {
        ContactHelper.form.addClass('hidden');
        
        setTimeout(() => {
            ContactHelper.form.hide();
            ContactHelper.loading.show();
            ContactHelper.loading.addClass('visible');
        },300);
    }
    
    public static hideLoader(): void {
        ContactHelper.loading.removeClass('visible');
        
        setTimeout(() => {
            ContactHelper.loading.hide();
        }, 300);
    }
    
    public static submitSuccess(): void {
        ContactHelper.success.show();
        ContactHelper.success.addClass('visible');
        
        setTimeout(() => {
            ContactHelper.success.removeClass('visible');
            setTimeout(() => {
                ContactHelper.success.hide();
                ContactHelper.form.show();
                ContactHelper.form.removeClass('hidden');
            }, 300);
        }, 2500);
        
    }
    
    public static submitFailure(): void {
        ContactHelper.failure.show();
        ContactHelper.failure.addClass('visible');
        
        setTimeout(() => {
            ContactHelper.failure.removeClass('visible');
            setTimeout(() => {
                ContactHelper.failure.hide();
                ContactHelper.form.show();
                ContactHelper.form.removeClass('hidden');
            }, 300);
        }, 2500);
    }
}