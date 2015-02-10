// LICENSE : MIT
"use strict";
var URL = require("url");
var findInLocal = require("./local-finder").findInLocal;
var hasFileInLocal = require("./local-finder").hasFileInLocal;
function interceptRequest(proxy, options) {
    var intercept = function (req, res, done) {
        // remove localhost prefix
        var fullUrl = req.fullUrl();
        var proxyBaseURL = new RegExp("^http://localhost:" + options.port + "\\/");
        var targetURL = URL.parse(fullUrl.replace(proxyBaseURL, ""));
        if (hasFileInLocal(targetURL.href, options.mockFileDir)) {
            this.serve(findInLocal(targetURL.href, options.mockFileDir), done);
            return;
        }
        req.hostname = targetURL.host;
        req.url = targetURL.pathname;
        req.port = 80;
        done();
    };
    proxy.intercept('request', intercept);
}
module.exports = {
    interceptRequest: interceptRequest
};