"use strict";
exports.__esModule = true;
var rackManager_1 = require("./rackManager");
var utils_1 = require("./utils");
var THRESHOLD = 500;
var THRESHOLD_SQ = THRESHOLD * THRESHOLD;
function nearest(req, res, next) {
    var _a = utils_1.toXY(parseFloat(req.query.lat), parseFloat(req.query.long)), x = _a[0], y = _a[1];
    rackManager_1.getRacks().then(function (racks) {
        var closest = racks.filter(function (v) {
            return utils_1.distSq(v.pos.x, v.pos.y, x, y) <= THRESHOLD_SQ;
        });
        res.send(closest);
    })["catch"](function (e) {
        next(e);
    });
}
exports.nearest = nearest;
//# sourceMappingURL=nearest.js.map