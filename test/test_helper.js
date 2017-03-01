const mongoose = require('mongoose')
const config = require('./../config')

before((done) => {
  mongoose.connect(config.mongodbUri.test)
  mongoose.connection
    .once('open', () => done())
    .on('error', (err) => {
      console.warn('Warning', err)
    })
})

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections
  drivers.drop()
    .then(() => done())
    // first time this test runs. There won't be a collection to drop
    .catch(() => done())
})
