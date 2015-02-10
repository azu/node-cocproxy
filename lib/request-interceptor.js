// LICENSE : MIT
"use strict";
var URL = require("url");
var findInLocal = require("./local-finder").findInLocal;
var hasFileInLocal = require("./local-finder").hasFileInLocal;
function interceptRequest(proxy, options) {
    proxy.intercept('request', function (req, res, done) {
        var targetURL = URL.parse(req.fullUrl());
        if (hasFileInLocal(targetURL.href, options.mockFileDir)) {
            this.serve(findInLocal(targetURL.href, options.mockFileDir), done);
            return;
        }
        req.hostname = targetURL.host;
        req.url = targetURL.pathname;
        req.port = 80;
        done();
    });
}
module.exports = {
    interceptRequest: interceptRequest
};