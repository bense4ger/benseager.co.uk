/**
 * Created by benseager on 08/02/2016.
 */
'use strict';
var jasmine = require('jasmine'),
    Browser = require('zombie');

Browser.localhost('benseager.co.uk', 8000);

describe('IndexView', () => {
    const browser = new Browser();
    beforeAll((done) => {
        browser.visit('/', () => {
            console.log(browser.location.href);
            done()
        });
    });

    it('should be visited', (done) => {
        browser.assert.success();
        done();
    });

    describe('intro', () => {
        it('should be rendered', (done) => {
            browser.assert.element('div#intro');
            done();
        });
        it('should have some content', (done) => {
            browser.assert.elements('div#intro p', 2);
            done();
        });
    });

    describe('posts', () => {
        it('should be rendered', (done) => {
            browser.assert.element('div#posts');
            done();
        });
        it('should have some content', (done) => {
            browser.assert.elements('div#post', { atLeast: 1 });
            done();
        });
    });

    describe('tweets', () => {
        it('should be rendered', (done) => {
            browser.assert.element('div#tweets');
            done();
        });
        it('should have some content', (done) => {
            browser.assert.elements('div#tweet', { atLeast: 1 });
            done();
        });
    });
});
