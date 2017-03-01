const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const Driver = mongoose.model('driver')

const app = require('./../../app')

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

  it('PUT requests to /api/drivers edits an existing driver', (done) => {
    const driver = new Driver({ email: 'old@test.com' })
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
})
