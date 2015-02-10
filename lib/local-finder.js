"use strict";
var URL = require("url");
var path = require("path");
var fs = require("fs");
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

/**
 * if the file(not contain directory) is found, then return true, otherwise return false.
 * @param url
 * @param mockFileDir
 * @returns {boolean}
 */
function hasFileInLocal(url, mockFileDir) {
    var filePath = findInLocal(url, mockFileDir);
    var status;
    try{
        status = fs.statSync(filePath);
    }catch(e){
        return false;
    }
    return status.isFile();
}
module.exports = {
    findInLocal: findInLocal,
    hasFileInLocal: hasFileInLocal
};
