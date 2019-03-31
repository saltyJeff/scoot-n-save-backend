import * as proj4 from 'proj4'

export function fromXY(x: number, y: number): number[] {
    return proj4('GOOGLE', 'WGS84', [x, y])
}
export function toXY(lat: number, long: number): number[] {
    return proj4('WGS84', 'GOOGLE', [long, lat])
}
export function distSq(x1: number, y1: number, x2: number, y2: number) {
    return (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2)
}