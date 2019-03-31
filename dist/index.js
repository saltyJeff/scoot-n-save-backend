"use strict";
exports.__esModule = true;
require('source-map-support').install();
var express = require("express");
var nearest_1 = require("./nearest");
var stop_1 = require("./stop");
var changeStops_1 = require("./changeStops");
var cors = require("cors");
var debug_1 = require("./debug");
var listStops_1 = require("./listStops");
var stats_1 = require("./stats");
var port = process.env.PORT || 3000;
var app = express();
app.use(cors());
app.use(express.json());
app.get('/nearest', nearest_1.nearest);
app.get('/stop', stop_1.stop);
app.post('/addrack', changeStops_1.addRack);
app.get('/badstops', changeStops_1.listBadStops);
app.get('/stops', listStops_1.listStops);
app.get('/debug/on', debug_1.debugStopOn);
app.get('/debug/off', debug_1.debugStopOff);
app.get('/stats', stats_1.showStats);
app.get('/alive', function (res, req) {
    console.log('alive-console');
    req.send('still alive');
});
app.listen(port, function () {
    console.log("congratulations on your code compiling " + port + "!");
});
//# sourceMappingURL=index.js.map