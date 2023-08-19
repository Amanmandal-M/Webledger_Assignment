"use strict";
/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var source_map_support_1 = require("source-map-support");
var standalone_1 = require("@adonisjs/core/build/standalone");
source_map_support_1.default.install({ handleUncaughtExceptions: false });
new standalone_1.Ignitor(__dirname)
    .httpServer()
    .start();
