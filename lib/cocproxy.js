var hoxy = require('hoxy');
var URL = require("url");
var proxy = new hoxy.Proxy().listen(8087);
proxy.intercept('request', function (req) {
    var url = URL.parse(req.url.replace(/^\//, ''));
    req.hostname = 'example.com';
    try {
        this.data("request", {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.string
        });
    }
    catch (e) {
        console.error(e);
    }
});
proxy.log('error warn', function (event) {
    console.error(event.level + ': ' + event.message);
    if (event.error) {
        console.error(event.error.stack);
    }
});