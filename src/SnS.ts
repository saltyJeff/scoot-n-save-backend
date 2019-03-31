import { X_OK } from "constants";

export type ScootSpotTypes = 'Corral' |
'Parks' |
'Plaza' |
'Racks' |
'Suggested'

export interface ScootnSave {
    pos: Position,
    type: ScootSpotTypes,
    stops: number,
    id: string
}

export interface Position {
    lat: number,
    long: number,
    x: number,
    y: number
}