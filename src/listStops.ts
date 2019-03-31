import {Request, Response} from 'express'
import {getRacks} from './rackManager'
import { distSq, toXY } from './utils'

export function listStops(req: Request, res: Response, next) {
    getRacks().then(racks => {
        res.send(racks)
    })
    .catch(e => {
        next(e)
    })
}