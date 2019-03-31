"use strict";
exports.__esModule = true;
var rackManager_1 = require("./rackManager");
function listStops(req, res, next) {
    rackManager_1.getRacks().then(function (racks) {
        res.send(racks);
    })["catch"](function (e) {
        next(e);
    });
}
exports.listStops = listStops;
//# sourceMappingURL=listStops.js.map