let goodPpl = 0
let badPpl = 0
let neutral = 0

export function incGood() {
    goodPpl++
}
export function incBad() {
    badPpl++
}
export function incNeutral() {
    neutral++
}
import {Request, Response} from 'express'
export function showStats(req: Request, res: Response) {
    res.send({
        good: goodPpl,
        bad: badPpl,
        neutral: neutral
    })
}