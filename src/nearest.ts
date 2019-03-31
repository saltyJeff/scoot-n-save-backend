import {Request, Response} from 'express'
import {getRacks} from './rackManager'
import { distSq, toXY } from './utils'
import * as shortid from 'shortid'

const THRESHOLD = 500
const THRESHOLD_SQ = THRESHOLD * THRESHOLD
export function nearest(req: Request, res: Response, next) {
    const [x,y] = toXY(parseFloat(req.query.lat), parseFloat(req.query.long))
    getRacks().then(racks => {
        const closest = racks.filter(v => {
            return distSq(v.pos.x, v.pos.y, x, y) <= THRESHOLD_SQ
        })
        res.send(closest)
    })
    .catch(e => {
        next(e)
    })
}