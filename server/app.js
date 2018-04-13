const { Nuxt } = require('nuxt')
const express = require('express')
const config = require('./../nuxt.config.js')
const cors = require('koa2-cors')
config.dev = false

const app = express()

const corsOptions = {
  origin: `https://${process.env.DOMAIN}`
}

const setHeaders = (req, res, next) => {
  res.removeHeader('x-powered-by')
  res.header('no-cache', 'Set-Cookie')
  res.header('x-xss-protection', '1; mode=block')
  res.header('x-frame-options', 'DENY')
  res.header('x-content-type-options', 'nosniff')
  res.header('Cache-Control', 'max-age=120')
  next()
}

app.use(setHeaders)
app.use(cors(corsOptions))
const nuxt = new Nuxt(config)

app.use((req, res, next) => {
  console.log('Request URL: ', req.url)
  nuxt.render(req, res, next)
})

module.exports.app = app
