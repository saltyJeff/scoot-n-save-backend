import {ScootnSave, ScootSpotTypes, Position} from './SnS'
import fetch from 'node-fetch'
import {fromXY, toXY} from './utils'
import * as fs from 'fs-extra'
import * as shortid from 'shortid'
import { StatOptions } from 'http2';
const RACK_FILENAME = 'racks.json'
const BADSTOP_FILENAME = 'badstops.json'
const writeOps = {
    'spaces': ''
}

const urls = {
    'Corral': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/bikecorrals/FeatureServer/0/query?where=1%3D1&f=json',
    'Parks': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/Parklets_Nov25_14/FeatureServer/0/query?where=1%3D1&f=json',
    'Plaza': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/Plaza_Nov25_14/FeatureServer/0/query?where=1%3D1&f=json',
    'Racks': 'https://services1.arcgis.com/tp9wqSVX1AitKgjd/arcgis/rest/services/City_Art_Bike_Racks/FeatureServer/0/query?where=1%3D1&f=json'
}
let rackCache: ScootnSave[] = null
let badStops: Position[] = null
export async function getRacks(): Promise<ScootnSave[]> {
    console.log('seeking out racks')
    if(rackCache != null) {
        console.log('using cache')
        return rackCache
    }
    // if(rackFileExists()) {
    //     rackCache = await readRackFile()
    //     return rackCache
    // }
    const ans: ScootnSave[] = []
    ans.push.apply(ans, await fetchAndExtract('Corral'))
    ans.push.apply(ans, await fetchAndExtract('Parks'))
    ans.push.apply(ans, await fetchAndExtract('Plaza'))
    ans.push.apply(ans, await fetchAndExtract('Racks'))
    rackCache = ans
    await persistRack()
    console.log('end hits')
    return rackCache
}
export async function getRackById(id: string) {
    const racks = await getRacks()
    return racks.find(r => r.id == id)
}
async function fetchAndExtract(urlType: ScootSpotTypes): Promise<ScootnSave[]> {
    const url = urls[urlType]
    console.log('hitting: ', url)
    const req = await fetch(url)
    const json = await req.json()
    return bagNTag(json ,urlType)
}
function bagNTag(json: any, type: ScootSpotTypes): ScootnSave[] {
    const elems = json.features.map((x => x.geometry))
    const r = elems.map(e => {
        const [long, lat] = fromXY(e.x, e.y)
        const r: ScootnSave = {
            pos: {
                x: e.x,
                y: e.y,
                lat: lat,
                long: long,
            },
            type: type,
            stops: 0,
            id: shortid.generate()
        }
        return r
    })
    return r
}
function rackFileExists(): boolean {
    return fs.existsSync(RACK_FILENAME)
}
async function readRackFile(): Promise<ScootnSave[]> {
    return await fs.readJson(RACK_FILENAME)
}
async function persistRack() {
    return;
    await fs.writeJson(RACK_FILENAME, rackCache, writeOps)
}
export async function addSavedRack(lat: number, long: number) {
    const [x,y] = toXY(lat, long)
    await getRacks()
    rackCache.push({
        pos: {
            x: x,
            y: y,
            lat: lat,
            long: long,
        },
        type: 'Suggested',
        stops: 0,
        id: shortid.generate()
    })
    await persistRack()
}
export async function incStops(space: ScootnSave) {
    space.stops++
    await persistRack()
}

//BEGIN BAD SPOT RECORDING FOR BIG DATA
export async function recordBadStop(pos: Position) {
    const stopList = await getBadStops()
    stopList.push(pos)
    await persistBadStops()
}
export async function getBadStops(): Promise<Position[]> {
    if(badStops != null) {
        return badStops
    }
    // if(fs.existsSync(BADSTOP_FILENAME)) {
    //     badStops = await fs.readJson(BADSTOP_FILENAME)
    //     return badStops
    // }
    badStops = []
    await persistBadStops()
    return badStops
}
async function persistBadStops() {
    return;
    await fs.writeJson(BADSTOP_FILENAME, badStops, writeOps)
}