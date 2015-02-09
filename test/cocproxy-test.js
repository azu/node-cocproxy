// LICENSE : MIT
"use strict";
var CocProxy = require("../lib/cocproxy").CocProxy;
var assert = require("power-assert");
var http = require("http");
var fs = require("fs");
var path = require("path");
var fixtureDir = path.join(__dirname, "fixtures/");
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
        context("when found the file is match the url", function () {
            beforeEach(function () {
                cocProxy = new CocProxy({
                    mockFileDir : fixtureDir
                });
                cocProxy.start()
            });
            it("should return the content of local file", function (done) {
                http.get("http://localhost:8087/http://example.com/script.js", function (res) {
                    var body = '';
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        body += chunk;
                    });
                    res.on('end', function (res) {
                        var expected = fs.readFileSync(__dirname + "/fixtures/example.com/script.js", "utf-8");
                        assert.equal(body, expected);
                        done();
                    });
                }).on('error', done);
            });
        });
    });
});