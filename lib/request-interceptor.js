// LICENSE : MIT
"use strict";
function interceptRequest(proxy) {
    proxy.intercept('request', function (req) {
        var targetURL = URL.parse(req.url.replace(/^\//, ''));
        req.hostname = targetURL.host;
        req.url = targetURL.pathname;
        req.port = 80;
    });
}
module.exports = {
    interceptRequest: interceptRequest
};