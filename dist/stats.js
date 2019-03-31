"use strict";
exports.__esModule = true;
var goodPpl = 0;
var badPpl = 0;
var neutral = 0;
function incGood() {
    goodPpl++;
}
exports.incGood = incGood;
function incBad() {
    badPpl++;
}
exports.incBad = incBad;
function incNeutral() {
    neutral++;
}
exports.incNeutral = incNeutral;
function showStats(req, res) {
    res.send({
        good: goodPpl,
        bad: badPpl,
        neutral: neutral
    });
}
exports.showStats = showStats;
//# sourceMappingURL=stats.js.map