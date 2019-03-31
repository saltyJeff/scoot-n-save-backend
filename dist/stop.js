"use strict";
exports.__esModule = true;
var rackManager_1 = require("./rackManager");
var utils_1 = require("./utils");
var stats_1 = require("./stats");
var THRESHOLD = 15;
var THRESHOLD_SQ = THRESHOLD * THRESHOLD;
var CONSIDERING = 400;
var CONSIDERING_SQ = CONSIDERING * CONSIDERING;
function stop(req, res, next) {
    console.log(req.query);
    var lat = parseFloat(req.query.lat);
    var long = parseFloat(req.query.long);
    console.log(lat, long);
    var _a = utils_1.toXY(lat, long), x = _a[0], y = _a[1];
    console.log(x, y);
    rackManager_1.getRacks().then(function (racks) {
        var nearestSpot = null;
        var wasOneAvailable = false;
        var nearest = 100000000;
        for (var _i = 0, racks_1 = racks; _i < racks_1.length; _i++) {
            var rack = racks_1[_i];
            var dist = utils_1.distSq(rack.pos.x, rack.pos.y, x, y);
            if (dist <= THRESHOLD_SQ) {
                nearestSpot = rack;
                break;
            }
            if (dist <= CONSIDERING_SQ) {
                wasOneAvailable = true;
            }
            if (dist < nearest) {
                nearest = dist;
            }
        }
        console.log('nearest was: ', nearest);
        if (nearestSpot != null) {
            rackManager_1.incStops(nearestSpot).then(function () {
                stats_1.incGood();
                res.send("GOOD PERSON");
            })["catch"](function (e) { return next(e); });
        }
        else if (!wasOneAvailable) {
            rackManager_1.recordBadStop({
                lat: lat,
                long: long,
                x: x,
                y: y
            }).then(function () {
                stats_1.incNeutral();
                res.send("NO SPACE NEARBY");
            })["catch"](function (e) { return next(e); });
        }
        else {
            stats_1.incBad();
            res.status(420);
            res.send('SMH');
        }
    })["catch"](function (e) {
        next(e);
    });
}
exports.stop = stop;
//# sourceMappingURL=stop.js.map