"use strict";
var URL = require("url");
var path = require("path");
/**
 * find the file to replace with {@link url}.
 * @param {string} url the url string is used for matching file.
 * @param {string} mockFileDir the mockFileDir is base directory path.
 * @return {string} the file path
 */
function findInLocal(url, mockFileDir) {
    var urlObject = URL.parse(url);
    var baseDir = path.resolve(process.cwd(), mockFileDir);
    return path.join(baseDir, urlObject.host, urlObject.pathname);
}
module.exports = {
    findInLocal: findInLocal
};
