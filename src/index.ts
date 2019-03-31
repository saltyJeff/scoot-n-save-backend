require('source-map-support').install()

import * as express from 'express'
import * as bodyparser from 'body-parser'
import {nearest} from './nearest'
import {stop} from './stop'
import { addRack, listBadStops } from './changeStops'
import * as cors from 'cors'
import { debugStopOn, debugStopOff } from './debug';
import { listStops } from './listStops';
import { showStats } from './stats';

const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())

app.get('/nearest', nearest)
app.get('/stop', stop)
app.post('/addrack', addRack)
app.get('/badstops', listBadStops)
app.get('/stops', listStops)
app.get('/debug/on', debugStopOn)
app.get('/debug/off', debugStopOff)
app.get('/stats', showStats)
app.get('/alive', (res, req) => {
    console.log('alive-console')
    req.send('still alive')
})

app.listen(port, () => {
    console.log(`congratulations on your code compiling ${port}!`)
})
