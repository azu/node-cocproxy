var hoxy = require('hoxy');
var URL = require("url");
var http = require("http");
var proxy = new hoxy.Proxy().listen(8087);
proxy.intercept('request', function (req) {
    var targetURL = URL.parse(req.url.replace(/^\//, ''));
    req.hostname = targetURL.host;
    req.url = targetURL.pathname;
    req.port = 80;
});
proxy.log('error warn', function (event) {
    console.error(event.level + ': ' + event.message);
    if (event.error) {
        console.error(event.error.stack);
    }
});

http.get("http://localhost:8087/http://httpbin.org/get", function (res) {
    console.log("Got response: " + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
}).on('error', function (e) {
    console.log("Got error: " + e.message);
});