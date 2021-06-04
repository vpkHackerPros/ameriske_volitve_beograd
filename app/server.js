/*
 *
 *  handla:
 *    - VIZRT na NVG01 -> grafike
 *    - Metus -> snemanje
 *    - Yamahino mešalko -> audio scene
 *
 *  - podatke iz front-enda dobim preko POST requestov
 *  - triggerje iz Tricasterja dobim preko GET requestov
 *  - z metusom se pogovarjam po socketu
 *  - za mešalko prek druzga serverja, ki upravlja z MIDI interfacom, kličem scene
 *
 *
 * */


const express = require('express')
const bodyParser = require('body-parser')
const net = require('net')
const { exec } = require('child_process')
const fs = require('fs')
const app = express()
const port = 4545

import newTek from './newTek.js'
import VizCommands from './VizCommands.js'
import metus from './METUS_COMMANDS.js' 

const VIZ = new VizCommands()
const client = new net.Socket()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



let ip = 'localhost'
let viz_port = 6100
let bidenPercent = 50
let trumpPercent = 50


const afterAddsDelays = [1500, 1000, 4000, 15000, 15300]
const afterAddsGraphics = () => [
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.tema_IN(trenutnaTema) ,
  VIZ.crawl_IN() + VIZ.crawl_START(),
]
const playGraphics = (graphics, delays) => {
  graphics.map((gfx, i) => {
    setTimeout( () => {
      console.log(gfx)
      client.connect(viz_port, ip, () => {
      client.write(gfx)
      client.destroy()
    })}, delays[i])
  })
}


app.get('/screenIN', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  console.log('backend got screenIN')
  playGraphics([
    '0 RENDERER*STAGE*DIRECTOR*$Ekran_In START\0'
  ],[0])
})
app.get('/screenOUT', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  playGraphics([
    '0 RENDERER*STAGE*DIRECTOR*$Ekran_Out START\0'
  ],[0])
  console.log('backend got screenOUT')
})
app.get('/mapaIN', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  playGraphics([
    '0 RENDERER*STAGE*DIRECTOR*$Mapa_In_Out START\0'
  ],[0])
  console.log('backend got mapaIN')
})
app.get('/mapaOUT', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  playGraphics([
    '0 RENDERER*STAGE*DIRECTOR*$Mapa_In_Out CONTINUE\0'
  ],[0])
  console.log('backend got mapaOUT')
})
app.get('/totemIN', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  playGraphics([
    '0 RENDERER*STAGE*DIRECTOR*$Totemi_In_Out START\0'
  ],[0])
  console.log('backend got totemIN')
})
app.get('/totemOUT', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  playGraphics([
    '0 RENDERER*STAGE*DIRECTOR*$Totemi_In_Out CONTINUE\0'
  ],[0])
  console.log('backend got totemOUT')
})

/*  Post requesti, da dobim podatke iz react frontenda.  */
app.post('/percent', (req, res) => {
  console.log(req.body)
  console.log('biden =', req.body.percent.biden)
  console.log('trump =', req.body.percent.trump)
  bidenPercent = req.body.percent.biden
  trumpPercent = req.body.percent.trump
  playGraphics([
    `0 RENDERER*TREE*$PROCENT_1*GEOM*TEXT SET ${bidenPercent}\0`,
    `0 RENDERER*TREE*$PROCENT_2*GEOM*TEXT SET ${trumpPercent}\0`
  ],[0])
  res.sendStatus(200)
})
app.post('/connection', (req, res) => {
  console.log('ip =', req.body.connection.ip)
  console.log('port =', req.body.connection.port)
  ip = req.body.connection.ip
  viz_port = req.body.connection.port
  res.sendStatus(200)
})

app.listen(port, () => console.log(`Listening on at http://localhost:${port}`))
