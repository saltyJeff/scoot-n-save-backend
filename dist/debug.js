"use strict";
exports.__esModule = true;
var rackManager_1 = require("./rackManager");
var stop_1 = require("./stop");
var METERS_PER_SEC = 0.0003;
function debugStopOn(req, res, next) {
    var id = req.query.id;
    rackManager_1.getRackById(id).then(function (r) {
        req.query.lat = r.pos.lat,
            req.query.long = r.pos.long;
        stop_1.stop(req, res, next);
    });
}
exports.debugStopOn = debugStopOn;
function debugStopOff(req, res, next) {
    var id = req.query.id;
    rackManager_1.getRackById(id).then(function (r) {
        req.query.lat = r.pos.lat + 1 * METERS_PER_SEC,
            req.query.long = r.pos.long;
        stop_1.stop(req, res, next);
    });
}
exports.debugStopOff = debugStopOff;
//# sourceMappingURL=debug.js.map