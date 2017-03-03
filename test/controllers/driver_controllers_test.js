const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('./../../app')
const Driver = mongoose.model('driver')

describe('Drivers controller', () => {
  it('POST requests to /api/drivers creates a new driver', (done) => {
    Driver.count().then((count) => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount)
            done()
          })
        })
    })
  })

  it('PUT requests to /api/drivers/:id edits an existing driver', (done) => {
    const driver = new Driver({ email: 'old@test.com', driving: false })
    const newEmail = 'new@test.com'

    driver.save().then(() => {
      request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({
        email: newEmail,
        driving: true
      })
      .end(() => {
        Driver.findById(driver._id)
          .then((drisver) => {
            assert(drisver.email === newEmail && drisver.driving === true)
            done()
          })
      })
    })
  })

  it('DELETE requests to /api/drivers/:id deletes an existing driver', (done) => {
    const driver = new Driver({ email: 'test@test.com' })
    const { _id } = driver

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${_id}`)
        .end(() => {
          Driver.findById(_id)
            .then((driver) => {
              assert(driver === null)
              done()
            })
        })
    })
  })

  it('GET requests to /api/drivers finds drivers given a location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    })
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
    })

    Promise.all([ seattleDriver.save(), miamiDriver.save() ])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            if (err) assert(false)
            assert(response.body.length === 1)
            assert(response.body[0].obj.email === 'miami@test.com')
            done()
          })
      })
  })
})
