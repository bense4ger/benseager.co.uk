"use strict";
function gaPageView(pageName, route) {
    ga('set', pageName, route);
    ga('send', 'pageview');
}
exports.gaPageView = gaPageView;
