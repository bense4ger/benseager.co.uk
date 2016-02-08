/**
 * Created by benseager on 08/02/2016.
 */
'use strict';
var jasmine = require('jasmine'),
    Browser = require('zombie');

Browser.localhost('benseager.co.uk', 8000);

describe('ContactView', () => {
    const browser = new Browser();
    beforeAll((done) => {
        browser.visit('/#contact', () => {
            console.log(browser.location.href);
            done()
        });
    });

    it('should be visited', (done) => {
        browser.assert.success();
        done();
    });

    describe('contact form', () => {
        it('should be rendered', (done) => {
            browser.assert.element('form#contact-form');
            done();
        });


    });

});