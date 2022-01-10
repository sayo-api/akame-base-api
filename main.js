//MINI BASE DE APIS
//EXEMPLOS...
//@SAYO

__path = process.cwd()

var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
var fs = require('fs')

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}
 router.all('/loli', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Erro no servidor' })
   }
   })
  router.get('/canvas/*', async (req, res) => {
   let { url, texto } = req.query
   try {
  switch(req.path.replace(/\/canvas/, '').toLowerCase()) {
 case '/trigger':
 case '/trigger/':
  if (!url) return res.status(408).send({ status: 408, menssagem: 'Coloque a url no parametrô'})
  res.type('gif')
  res.send(await canvacord.trigger(url))
 break
 case '/changemymind':
 case '/changemymind/':
  if (!texto) return res.status(408).send({ status: 408, menssagem: 'Coloque o texto no parametrô' })
  res.type('jpg')
  res.send(await canvacord.changemymind(texto))
  break
 case '/clyde':
 case '/clyde/':
  if (!texto) return res.status(408).send({ status: 408, menssagem: 'Coloque o texto no parametrô' })
  res.type('jpg')
  res.send(await canvacord.clyde(texto))
  break
 default: 
 res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
 }
  } catch (e) {
  console.error(e) 
   res.type('text/json')
   res.status(400).send({ status: 400, menssagem: 'Erro no servidor por favor reporte para o sayo!' })
 }
 })
 router.get('/nsfw/hentai', async (req, res) => {
 try {
 end = getRandom([,"waifu", "neko"])
 let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
 let buffer = await getBuffer(url)
 res.type('png')
 res.send(buffer)
 } catch {
 res.type('text/json')
 res.status(400).send({ status: 400, menssagem: 'Erro no servidor por favor reporte para o sayo!' })
 }
 })
 router.all('/shota', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/shotas.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Server Error!' })
   }
   })
router.post('/post/body', async (req, res) => {
  res.send(req.body)
})
   router.all('/nsfwloli', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/nsfwlolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Erro no servidor por favor reporte para o sayo!' })
   }
   })
   router.all('*', async (req, res) => {
   res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
})
  

module.exports = router
