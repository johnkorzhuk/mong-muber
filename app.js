const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const router = require('./routes/routes')
const app = express()

const {
  NODE_ENV,
  mongodbUri
} = config

if (NODE_ENV !== 'test') {
  mongoose.connect(mongodbUri.default)
}

app
  .use(bodyParser.json())
  .use('/api', router)

module.exports = app
