(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Routing = require('./routing/router');
var menu_model_1 = require('./models/menu-model');
var layout_model_1 = require('./models/layout-model');
var layout_1 = require('./views/layout');
var Initialiser = (function () {
    function Initialiser() {
        this._menuJSONPath = './menu.json';
    }
    Initialiser.prototype.initLayout = function () {
        var _this = this;
        var initPromise = new Promise(function (resolve, reject) {
            $.ajax({
                url: _this._menuJSONPath,
                method: 'GET',
                contentType: 'application/json'
            })
                .then(function (data) {
                var menu = new menu_model_1.MenuModel({
                    items: data
                });
                var model = new layout_model_1.LayoutModel({
                    menu: menu
                });
                _this._view = new layout_1.LayoutView({
                    el: $('div#app'),
                    model: model
                });
                resolve(true);
            })
                .fail(function () {
                resolve(false);
            });
        });
        return initPromise;
    };
    Initialiser.prototype.renderLayout = function () {
        var _this = this;
        var renderPromise = new Promise(function (resolve, reject) {
            try {
                _this._view.render();
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
        return renderPromise;
    };
    Initialiser.prototype.initRouter = function () {
        var _this = this;
        var routerPromise = new Promise(function (resolve, reject) {
            $.ajax({
                url: _this._menuJSONPath,
                method: 'GET',
                contentType: 'application/json'
            })
                .then(function (data) {
                _this._router = new Routing.Router();
                Routing.bootstrapMenuRoutes(_this._router, data);
                resolve(true);
            })
                .fail(function () {
                resolve(false);
            });
        });
        return routerPromise;
    };
    return Initialiser;
}());
exports.Initialiser = Initialiser;

},{"./models/layout-model":3,"./models/menu-model":4,"./routing/router":5,"./views/layout":17}],2:[function(require,module,exports){
"use strict";
var recaptcha_1 = require('./utils/recaptcha');
var initialiser_1 = require('./initialiser');
$('document').ready(function () {
    window['recaptchaLoad'] = recaptcha_1.recaptchaLoad;
    var i = new initialiser_1.Initialiser();
    i.initLayout().then(function (result) {
        if (result === true) {
            i.renderLayout().then(function (result) {
                i.initRouter().then(function (result) {
                    Backbone.history.start();
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});
$(document).foundation();

},{"./initialiser":1,"./utils/recaptcha":12}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var menu_model_1 = require('./menu-model');
var LayoutModel = (function (_super) {
    __extends(LayoutModel, _super);
    function LayoutModel() {
        _super.apply(this, arguments);
    }
    LayoutModel.prototype.defaults = function () {
        return {
            menu: new menu_model_1.MenuModel()
        };
    };
    Object.defineProperty(LayoutModel.prototype, "menu", {
        get: function () {
            return this.get('menu');
        },
        enumerable: true,
        configurable: true
    });
    return LayoutModel;
}(Backbone.Model));
exports.LayoutModel = LayoutModel;

},{"./menu-model":4}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuModel = (function (_super) {
    __extends(MenuModel, _super);
    function MenuModel() {
        _super.apply(this, arguments);
    }
    MenuModel.prototype.defaults = function () {
        return {
            items: [
                { name: 'Home', route: '/' },
                { name: 'Build', route: 'build' },
                { name: 'Contact', route: 'contact' },
            ]
        };
    };
    Object.defineProperty(MenuModel.prototype, "items", {
        get: function () {
            return this.get('items');
        },
        enumerable: true,
        configurable: true
    });
    return MenuModel;
}(Backbone.Model));
exports.MenuModel = MenuModel;

},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var reflector_1 = require('../utils/reflector');
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        _super.apply(this, arguments);
    }
    return Router;
}(Backbone.Router));
exports.Router = Router;
function bootstrapMenuRoutes(router, routeData) {
    router['routes'] = {};
    _.each(routeData, function (rd) {
        router.routes[rd.route] = rd.name.toLowerCase();
        router[rd.name.toLowerCase()] = function () {
            var viewName = rd.name + "View";
            var view = reflector_1.Reflector.createNewInstance(viewName);
            view.render();
        };
    });
    router._bindRoutes();
}
exports.bootstrapMenuRoutes = bootstrapMenuRoutes;

},{"../utils/reflector":13}],6:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h2>build</h2>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-8 medium-9 small-offset-3 columns\">\n        <p>Have a project and need a developer?</p>\n        <p>I'm always interested to hear about interesting projects.</p>\n        <p>As a full-stack developer I'm happy working on small, static sites or larger, more complex projects.</p>\n        <p>Feel free to get in touch - details are on the<a href=\"#contact\"> contact page </a> - if you're just after a bit of advice, or if you'd like to bring me in to work on something I'd love to hear from you.</p>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h2>3rd sector</h2>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-8 medium-9 small-offset-3 columns\">\n        <p>I'm really happy to offer my time to charities and voluntary organisations.</p>\n        <p>If you need a developer, then feel free to drop me a line.</p>\n    </div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":38}],7:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h2>contact</h2>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-8 large-9 small-offset-3 columns\">\n        <p>Want to get in touch? You can drop me a message using this form, via email or on social media.</p>\n        <div class=\"spacer\"></div>\n        <div class=\"row\">\n            <div class=\"column\">\n                <form id=\"contact-form\">\n                    <div class=\"row\">\n                        <div class=\"small-12 large-3 columns\"><label for=\"name\">Name</label></div>\n                        <div class=\"small-12 large-9 columns\"><input type=\"text\" name=\"name\" id=\"name\" required/></div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"small-12 large-3 columns\"><label for=\"email\">Email</label></div>\n                        <div class=\"small-12 large-9 columns\"><input type=\"text\" name=\"email\" id=\"email\" required/></div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"small-12 large-3 columns\"><label for=\"message\">Message</label></div>\n                        <div class=\"small-12 large-9 columns\"><textarea name=\"message\" id=\"\" cols=\"30\" rows=\"5\" required></textarea></div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"small-12 large-9 large-offset-3 columns\">\n                            <div class=\"g-recaptcha\"></div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"small-4 large-4 large-offset-3 columns\"><input id=\"reset\" type=\"button\" value=\"Reset\" /></div>\n                        <div class=\"small-4 large-4 large-offset-1 columns end\"><input type=\"submit\" value=\"Send\" /></div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h2>email</h2>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-8 large-9 small-offset-3 columms\">\n        <p>Prefer to send an email?  No problem.</p>\n        <p>I can be reached via <a href=\"mailto:hello@benseager.co.uk\">hello@benseager.co.uk</a></p>\n    </div>\n</div>\n<script src='https://www.google.com/recaptcha/api.js?onload=recaptchaLoad&render=explicit' async defer></script>";
},"useData":true});

},{"hbsfy/runtime":38}],8:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h2>hello</h2>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-8 medium-9 small-offset-3 columns end\">\n        <p>Thanks for stopping by</p>\n        <p>I'm Ben Seager, a full stack software developer based in Norwich.</p>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-12 columns\">\n        <h2>interests</h2>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"small-8 medium-9 small-offset-3 columns end\">\n        <p>I'm primarily (professionally, at least) a .Net developer with plenty of experience working right the way through the Microsoft stack.</p>\n        <p>I can also be found using Node and client-side frameworks such as Backbone (I've kinda fallen in love with Vue.js now as well).</p>\n        <p>Most of my interest lies with the web - either on the client or further down the stack.  I've recently developed a bit of an obsession with microservices.</p>\n        <p>Less work related interests include a PS4 and an unhealthy relationship with Norwich City FC.</p>\n    </div>\n</div>\n";
},"useData":true});

},{"hbsfy/runtime":38}],9:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <li><a id=\"nav_"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" href=\"#"
    + alias2(alias1((depth0 != null ? depth0.route : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"row\">\n    <div class=\"columns spacer\"></div>\n</div>\n<div class=\"row\" id=\"header\">\n    <div class=\"small-2 columns\">\n        <div id=\"header-image\"><img src=\"dist/images/somecode.png\" alt=\"header image\"></div>\n    </div>\n    <div class=\"small-1 columns\"></div>\n    <div class=\"small-9 columns\">\n        <h1>Ben Seager</h1>\n        <!-- Large Menu -->\n        <div class=\"row show-for-large\" id=\"large-menu\">\n            <div class=\"small-12 columns\">\n                <ul class=\"menu\" id=\"navigation\">\n";
  stack1 = ((helper = (helper = helpers.menuItems || (depth0 != null ? depth0.menuItems : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"menuItems","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.menuItems) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    <li><a href=\"https://twitter.com/digsb\" target=\"_blank\"><i class=\"fa fa-twitter\" aria-hidden=\"true\"></i></a></li>\n                    <li><a href=\"https://github.com/bense4ger/\" target=\"_blank\"><i class=\"fa fa-github\" aria-hidden=\"true\"></i></a></li>\n                    <li><a href=\"https://uk.linkedin.com/in/bdseager\" target=\"_blank\"><i class=\"fa fa-linkedin\" aria-hidden=\"true\"></i></a></li>\n                </ul>\n            </div>\n        </div>\n        <!-- End of Large Menu -->\n        <!-- Small Menu -->\n        <!-- End of Small Menu -->\n    </div>\n</div>\n<section id=\"content\"></section>";
},"useData":true});

},{"hbsfy/runtime":38}],10:[function(require,module,exports){
"use strict";
var ContactHelper = (function () {
    function ContactHelper() {
    }
    ContactHelper.recaptchaSubmit = function () {
        var _this = this;
        var recaptchaPromise = new Promise(function (resolve, reject) {
            var response = document.getElementById('g-recaptcha-response').value;
            if (!response) {
                reject('No recaptcha');
            }
            $.ajax({
                url: _this.VERIFY_URL + "/" + response,
                method: 'GET',
                dataType: 'json',
            })
                .then(function (data, textStatus, xhr) {
                xhr.status === 200
                    ? resolve(true)
                    : resolve(false);
            })
                .fail(function () {
                resolve(false);
            });
        });
        return recaptchaPromise;
    };
    ContactHelper.formSubmit = function () {
        var _this = this;
        var submitPromise = new Promise(function (resolve, reject) {
            var form = document.getElementById('contact-form');
            var formData = {
                name: form.querySelectorAll('input[name="name"]')[0].value,
                email: form.querySelectorAll('input[name="email"]')[0].value,
                message: form.querySelectorAll('textarea[name="message"]')[0].value
            };
            $.ajax({
                url: _this.SUBMIT_URL,
                method: 'POST',
                dataType: 'json',
                data: JSON.stringify(formData)
            })
                .then(function (data) {
                resolve(true);
            })
                .fail(function () {
                reject('Form not submitted');
            });
        });
        return submitPromise;
    };
    ContactHelper.VERIFY_URL = 'http://api-benseager.azurewebsites.net/recaptcha-verification';
    ContactHelper.SUBMIT_URL = 'http://formspree.io/hello@benseager.co.uk';
    return ContactHelper;
}());
exports.ContactHelper = ContactHelper;

},{}],11:[function(require,module,exports){
"use strict";
var home_view_1 = require('../views/home-view');
var contact_view_1 = require('../views/contact-view');
var build_view_1 = require('../views/build-view');
exports.GAC = {
    HomeView: home_view_1.HomeView,
    ContactView: contact_view_1.ContactView,
    BuildView: build_view_1.BuildView
};

},{"../views/build-view":14,"../views/contact-view":15,"../views/home-view":16}],12:[function(require,module,exports){
"use strict";
function recaptchaLoad() {
    var el = document.getElementsByClassName('g-recaptcha')[0];
    grecaptcha.render(el, { sitekey: '6LezDh4TAAAAAHSemQNOAK8pfm6FaqIjqSLzjWVS' });
}
exports.recaptchaLoad = recaptchaLoad;

},{}],13:[function(require,module,exports){
"use strict";
var gac_1 = require('./gac');
var Reflector = (function () {
    function Reflector() {
    }
    Reflector.createNewInstance = function (className) {
        var cls = gac_1.GAC[className];
        return new cls();
    };
    return Reflector;
}());
exports.Reflector = Reflector;

},{"./gac":11}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var static_view_1 = require('./static-view');
var Template = require('../templates/build.hbs');
var BuildView = (function (_super) {
    __extends(BuildView, _super);
    function BuildView() {
        _super.apply(this, arguments);
    }
    BuildView.prototype.render = function () {
        var template = Handlebars.compile(Template());
        var html = template();
        this.$el.html(html);
        return this;
    };
    return BuildView;
}(static_view_1.StaticView));
exports.BuildView = BuildView;

},{"../templates/build.hbs":6,"./static-view":18}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var contact_helper_1 = require('../utils/contact-helper');
var static_view_1 = require('./static-view');
var Template = require('../templates/contact.hbs');
var ContactView = (function (_super) {
    __extends(ContactView, _super);
    function ContactView() {
        _super.apply(this, arguments);
    }
    ContactView.prototype.events = function () {
        return {
            'submit #contact-form': 'submit',
            'click #reset': 'reset'
        };
    };
    ContactView.prototype.render = function () {
        var template = Handlebars.compile(Template());
        var html = template();
        this.$el.html(html);
        this.delegateEvents();
        return this;
    };
    ContactView.prototype.submit = function (e) {
        var _this = this;
        e.preventDefault();
        contact_helper_1.ContactHelper.recaptchaSubmit()
            .then(function (res) {
            if (res) {
                contact_helper_1.ContactHelper.formSubmit()
                    .then(function (res) {
                    console.log(res);
                    _this.reset(e);
                })
                    .catch(function (err) {
                    console.error(err);
                });
            }
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    ContactView.prototype.reset = function (e) {
        e.preventDefault();
        var controls = document.getElementById('contact-form').querySelectorAll('input[type="text"], textarea');
        _.each(controls, function (c) {
            c.value = '';
        });
        grecaptcha.reset();
    };
    return ContactView;
}(static_view_1.StaticView));
exports.ContactView = ContactView;

},{"../templates/contact.hbs":7,"../utils/contact-helper":10,"./static-view":18}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var static_view_1 = require('./static-view');
var Template = require('../templates/home.hbs');
var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        _super.apply(this, arguments);
    }
    HomeView.prototype.render = function () {
        var template = Handlebars.compile(Template());
        var html = template();
        this.$el.html(html);
        return this;
    };
    return HomeView;
}(static_view_1.StaticView));
exports.HomeView = HomeView;

},{"../templates/home.hbs":8,"./static-view":18}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Template = require('../templates/layout.hbs');
var LayoutView = (function (_super) {
    __extends(LayoutView, _super);
    function LayoutView() {
        _super.apply(this, arguments);
    }
    LayoutView.prototype.render = function () {
        var menuItems = this.model.menu.items;
        var template = Handlebars.compile(Template({
            menuItems: menuItems
        }));
        var html = template();
        this.$el.html(html);
        return this;
    };
    return LayoutView;
}(Backbone.View));
exports.LayoutView = LayoutView;

},{"../templates/layout.hbs":9}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StaticModel = (function (_super) {
    __extends(StaticModel, _super);
    function StaticModel() {
        _super.apply(this, arguments);
    }
    return StaticModel;
}(Backbone.Model));
var StaticView = (function (_super) {
    __extends(StaticView, _super);
    function StaticView() {
        _super.apply(this, arguments);
    }
    StaticView.prototype.initialize = function () {
        this.$el = $('section#content');
    };
    return StaticView;
}(Backbone.View));
exports.StaticView = StaticView;

},{}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars/base":20,"./handlebars/exception":23,"./handlebars/no-conflict":33,"./handlebars/runtime":34,"./handlebars/safe-string":35,"./handlebars/utils":36}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.5';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];


},{"./decorators":21,"./exception":23,"./helpers":24,"./logger":32,"./utils":36}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":22}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];


},{"../utils":36}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  if (loc) {
    this.lineNumber = line;
    this.column = column;
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}


},{"./helpers/block-helper-missing":25,"./helpers/each":26,"./helpers/helper-missing":27,"./helpers/if":28,"./helpers/log":29,"./helpers/lookup":30,"./helpers/with":31}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];


},{"../utils":36}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];


},{"../exception":23,"../utils":36}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];


},{"../exception":23}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];


},{"../utils":36}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];


},{}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];


},{}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];


},{"../utils":36}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];


},{"./utils":36}],33:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context !== depths[0]) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    options.data = _base.createFrame(options.data);
    partialBlock = options.data['partial-block'] = options.fn;

    if (partialBlock.partials) {
      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
    }
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}


},{"./base":20,"./exception":23,"./utils":36}],35:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}


},{}],37:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":19}],38:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":37}]},{},[2]);
