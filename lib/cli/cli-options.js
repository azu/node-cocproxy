// LICENSE : MIT
"use strict";
var optionator = require("optionator");
var name = require("../../package.json").name;
module.exports = optionator({
    prepend:  name +" [options]",
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
    options: [
        {
            heading: "Options"
        }, {
            option: "version",
            alias: "v",
            type: "Boolean",
            description: "Outputs the version number."
        },
        {
            option: "mock-file-dir",
            alias: "d",
            type: "path::String",
            description: "Set mock file from this directory"
        },
        {
            option: "port",
            alias: "p",
            type: "Number",
            description: "Set port number to thi proxy"
        }
    ]
});
