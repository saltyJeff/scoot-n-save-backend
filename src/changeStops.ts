import {Request, Response} from 'express'
import {getBadStops, addSavedRack} from './rackManager'
import { distSq, toXY } from './utils'
import * as shortid from 'shortid'

export function addRack(req: Request, res: Response, next) {
    console.log('body', req.body)
    addSavedRack(parseFloat(req.body.lat), parseFloat(req.body.long)).then(racks => {
        res.send('added rack')
    })
    .catch(e => {
        next(e)
    })
}
export function listBadStops(req: Request, res: Response, next) {
    getBadStops().then(stops => {
        res.send(stops)
    })
    .catch(e => {
        next(e)
    })
}