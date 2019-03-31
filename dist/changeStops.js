"use strict";
exports.__esModule = true;
var rackManager_1 = require("./rackManager");
function addRack(req, res, next) {
    console.log('body', req.body);
    rackManager_1.addSavedRack(parseFloat(req.body.lat), parseFloat(req.body.long)).then(function (racks) {
        res.send('added rack');
    })["catch"](function (e) {
        next(e);
    });
}
exports.addRack = addRack;
function listBadStops(req, res, next) {
    rackManager_1.getBadStops().then(function (stops) {
        res.send(stops);
    })["catch"](function (e) {
        next(e);
    });
}
exports.listBadStops = listBadStops;
//# sourceMappingURL=changeStops.js.map