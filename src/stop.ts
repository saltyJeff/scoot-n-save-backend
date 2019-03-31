import {Request, Response} from 'express'
import {getRacks, incStops, recordBadStop} from './rackManager'
import { distSq, toXY } from './utils'
import * as shortid from 'shortid'
import { ScootnSave } from './SnS'
import {incGood, incBad, incNeutral} from './stats'

const THRESHOLD = 15
const THRESHOLD_SQ = THRESHOLD * THRESHOLD

const CONSIDERING = 400
const CONSIDERING_SQ = CONSIDERING * CONSIDERING

export function stop(req: Request, res: Response, next) {
    console.log(req.query)
    const lat = parseFloat(req.query.lat)
    const long = parseFloat(req.query.long)
    console.log(lat, long)
    const [x,y] = toXY(lat, long)
    console.log(x,y)
    getRacks().then(racks => {
        let nearestSpot: ScootnSave = null
        let wasOneAvailable = false
        let nearest = 100000000
        for(let rack of racks) {
            let dist = distSq(rack.pos.x, rack.pos.y, x, y)
            if(dist <= THRESHOLD_SQ) {
                nearestSpot = rack
                break;
            }
            if(dist <= CONSIDERING_SQ) {
                wasOneAvailable = true
            }
            if(dist < nearest) {
                nearest = dist
            }
        }
        console.log('nearest was: ', nearest)
        if(nearestSpot != null) {
            incStops(nearestSpot).then(() => {
                incGood()
                res.send(`GOOD PERSON`)
            })
            .catch(e => next(e))
        }
        else if(!wasOneAvailable) {
            recordBadStop({
                lat: lat,
                long: long,
                x: x,
                y: y
            }).then(() => {
                incNeutral()
                res.send(`NO SPACE NEARBY`)
            })
            .catch(e => next(e))
        }
        else {
            incBad()
            res.status(420)
            res.send('SMH')
        }   
    })
    .catch(e => {
        next(e)
    })
}