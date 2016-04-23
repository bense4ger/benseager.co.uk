"use strict";
function recaptchaLoad() {
    var el = document.getElementsByClassName('g-recaptcha')[0];
    grecaptcha.render(el, { sitekey: '6LezDh4TAAAAAHSemQNOAK8pfm6FaqIjqSLzjWVS' });
}
exports.recaptchaLoad = recaptchaLoad;
