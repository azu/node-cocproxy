// LICENSE : MIT
"use strict";
var findInLocal = require("../lib/local-finder").findInLocal;
var hasFileInLocal = require("../lib/local-finder").hasFileInLocal;
var assert = require("power-assert");
var path = require("path");
var fixtureDir = path.join(__dirname, "fixtures/");
describe("findInLocal", function () {
    context("when find the file is match the url", function () {
        it("should return file path", function () {
            var url = "http://example.com/script.js";
            var filePath = findInLocal(url, fixtureDir);
            var expected = path.resolve(fixtureDir, "example.com/script.js");
            assert.equal(filePath, expected);
            assert(hasFileInLocal(url, fixtureDir));
        });
    });
    context("when find the directory is match the url", function () {
        it("should return false", function () {
            var url = "http://example.com/";
            assert(!hasFileInLocal(url, fixtureDir));
        });
    });
    context("when not exits the file", function () {
        it("should return false", function () {
            var url = "http://example.com/not_found.js";
            assert(!hasFileInLocal(url, fixtureDir));
        });
    });
});