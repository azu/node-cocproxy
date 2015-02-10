// LICENSE : MIT
"use strict";
var cliOptions = require("./cli-options");
var CocProxy = require("../cocproxy").CocProxy;
function execute(args) {
    var options = cliOptions.parse(args);
    if (options.version) { // version from package.json
        console.log("v" + require("../../package.json").version);
        return 0;
    } else if (options.help) {
        console.log(options.generateHelp());
        return 0;
    }
    var cocProxy = new CocProxy(options);
    cocProxy.start();
    console.log("Proxy stand by: http://localhost:" + cocProxy.options.port);
    console.log("Used mock dir : " + cocProxy.options.mockFileDir);
}
module.exports.execute = execute;