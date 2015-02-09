var hoxy = require('hoxy');
var URL = require("url");
var http = require("http");
var objectAssign = require("object-assign");
var DEFAULT_OPTIONS = {
    port: 8087,
    mockFileDir: process.cwd()
};
function CocProxy(options) {
    this.options = objectAssign(DEFAULT_OPTIONS, options);
}

CocProxy.prototype.start = function () {
    this.proxy = new hoxy.Proxy().listen(8087);
    require("./request-interceptor").interceptRequest(this.proxy, this.options);
    this.proxy.log('error warn', function (event) {
        console.error(event.level + ': ' + event.message);
        if (event.error) {
            console.error(event.error.stack);
        }
    });
};
CocProxy.prototype.exit = function () {
    if (!this.proxy) {
        throw new Error("Proxy didn't start yet!");
    }
    this.proxy.close();
};
module.exports.CocProxy = CocProxy;