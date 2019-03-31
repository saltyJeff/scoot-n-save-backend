"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var utils_1 = require("./utils");
var fs = require("fs-extra");
var shortid = require("shortid");
var RACK_FILENAME = 'racks.json';
var BADSTOP_FILENAME = 'badstops.json';
var writeOps = {
    'spaces': ''
};
var urls = {
    'Corral': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/bikecorrals/FeatureServer/0/query?where=1%3D1&f=json',
    'Parks': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/Parklets_Nov25_14/FeatureServer/0/query?where=1%3D1&f=json',
    'Plaza': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/Plaza_Nov25_14/FeatureServer/0/query?where=1%3D1&f=json',
    'Racks': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/City_Art_Bike_Racks/FeatureServer/0/query?where=1%3D1&f=json'
};
var rackCache = null;
var badStops = null;
function getRacks() {
    return __awaiter(this, void 0, void 0, function () {
        var ans, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    console.log('seeking out racks');
                    if (rackCache != null) {
                        console.log('using cache');
                        return [2 /*return*/, rackCache];
                    }
                    ans = [];
                    _b = (_a = ans.push).apply;
                    _c = [ans];
                    return [4 /*yield*/, fetchAndExtract('Corral')];
                case 1:
                    _b.apply(_a, _c.concat([_o.sent()]));
                    _e = (_d = ans.push).apply;
                    _f = [ans];
                    return [4 /*yield*/, fetchAndExtract('Parks')];
                case 2:
                    _e.apply(_d, _f.concat([_o.sent()]));
                    _h = (_g = ans.push).apply;
                    _j = [ans];
                    return [4 /*yield*/, fetchAndExtract('Plaza')];
                case 3:
                    _h.apply(_g, _j.concat([_o.sent()]));
                    _l = (_k = ans.push).apply;
                    _m = [ans];
                    return [4 /*yield*/, fetchAndExtract('Racks')];
                case 4:
                    _l.apply(_k, _m.concat([_o.sent()]));
                    rackCache = ans;
                    return [4 /*yield*/, persistRack()];
                case 5:
                    _o.sent();
                    console.log('end hits');
                    return [2 /*return*/, rackCache];
            }
        });
    });
}
exports.getRacks = getRacks;
function getRackById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var racks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRacks()];
                case 1:
                    racks = _a.sent();
                    return [2 /*return*/, racks.find(function (r) { return r.id == id; })];
            }
        });
    });
}
exports.getRackById = getRackById;
function fetchAndExtract(urlType) {
    return __awaiter(this, void 0, void 0, function () {
        var url, req, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = urls[urlType];
                    console.log('hitting: ', url);
                    return [4 /*yield*/, node_fetch_1["default"](url)];
                case 1:
                    req = _a.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, bagNTag(json, urlType)];
            }
        });
    });
}
function bagNTag(json, type) {
    var elems = json.features.map((function (x) { return x.geometry; }));
    var r = elems.map(function (e) {
        var _a = utils_1.fromXY(e.x, e.y), long = _a[0], lat = _a[1];
        var r = {
            pos: {
                x: e.x,
                y: e.y,
                lat: lat,
                long: long
            },
            type: type,
            stops: 0,
            id: shortid.generate()
        };
        return r;
    });
    return r;
}
function rackFileExists() {
    return fs.existsSync(RACK_FILENAME);
}
function readRackFile() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readJson(RACK_FILENAME)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function persistRack() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [2 /*return*/];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addSavedRack(lat, long) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, x, y;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = utils_1.toXY(lat, long), x = _a[0], y = _a[1];
                    return [4 /*yield*/, getRacks()];
                case 1:
                    _b.sent();
                    rackCache.push({
                        pos: {
                            x: x,
                            y: y,
                            lat: lat,
                            long: long
                        },
                        type: 'Suggested',
                        stops: 0,
                        id: shortid.generate()
                    });
                    return [4 /*yield*/, persistRack()];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addSavedRack = addSavedRack;
function incStops(space) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    space.stops++;
                    return [4 /*yield*/, persistRack()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.incStops = incStops;
//BEGIN BAD SPOT RECORDING FOR BIG DATA
function recordBadStop(pos) {
    return __awaiter(this, void 0, void 0, function () {
        var stopList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBadStops()];
                case 1:
                    stopList = _a.sent();
                    stopList.push(pos);
                    return [4 /*yield*/, persistBadStops()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.recordBadStop = recordBadStop;
function getBadStops() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (badStops != null) {
                        return [2 /*return*/, badStops];
                    }
                    // if(fs.existsSync(BADSTOP_FILENAME)) {
                    //     badStops = await fs.readJson(BADSTOP_FILENAME)
                    //     return badStops
                    // }
                    badStops = [];
                    return [4 /*yield*/, persistBadStops()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, badStops];
            }
        });
    });
}
exports.getBadStops = getBadStops;
function persistBadStops() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [2 /*return*/];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=rackManager.js.map