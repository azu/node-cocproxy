#!/usr/bin/env node
"use strict";
var cli = require("../lib/cli/cli");
var exitCode = cli.execute(process.argv);
if (typeof exitCode === "number") {
    process.exit(exitCode);
}
