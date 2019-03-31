import {Request, Response} from 'express'
import {getRackById} from './rackManager'
import { stop } from './stop';

const METERS_PER_SEC = 0.0003
export function debugStopOn(req: Request, res: Response, next) {
    const id = req.query.id
    getRackById(id).then(r => {
        req.query.lat = r.pos.lat,
        req.query.long = r.pos.long
        stop(req, res, next)
    })
}
export function debugStopOff(req: Request, res: Response, next) {
    const id = req.query.id
    getRackById(id).then(r => { //just slightly off to trigger false
        req.query.lat = r.pos.lat + 1 * METERS_PER_SEC,
        req.query.long = r.pos.long
        stop(req, res, next)
    })
}