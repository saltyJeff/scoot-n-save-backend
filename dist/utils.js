"use strict";
exports.__esModule = true;
var proj4 = require("proj4");
function fromXY(x, y) {
    return proj4('GOOGLE', 'WGS84', [x, y]);
}
exports.fromXY = fromXY;
function toXY(lat, long) {
    return proj4('WGS84', 'GOOGLE', [long, lat]);
}
exports.toXY = toXY;
function distSq(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}
exports.distSq = distSq;
//# sourceMappingURL=utils.js.map