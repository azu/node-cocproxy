// LICENSE : MIT
"use strict";
var CocProxy = require("../lib/cocproxy").CocProxy;
var assert = require("power-assert");
var http = require("http");
describe("CocProxy", function () {
    var cocProxy;
    beforeEach(function () {
        cocProxy = new CocProxy();
    });
    afterEach(function () {
        cocProxy.exit();
    });
    it("default options is set", function () {
        cocProxy.start();
        assert(cocProxy.options.port === 8087);
    });
    describe("request-interceptor", function () {

    });
});