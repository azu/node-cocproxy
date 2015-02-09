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
        beforeEach(function () {
            cocProxy.start()
        });
        context("when found the file is match the url", function () {
            it("should return the content of local file", function (done) {
                http.get("http://localhost:8087/http://www.google.com/index.html", function (res) {
                    console.log("Got response: " + res.statusCode);
                    var body = '';
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        body += chunk;
                    });
                    res.on('end', function (res) {
                        assert.equal(body, fs.readFileSync(__dirname + "/fixture/example.com/script.js", "utf-8"));
                        done();
                    });
                }).on('error', done);
            });
        });
        context("when not exits the file", function () {
            it("should return original content", function () {

            });
        });
    });
});