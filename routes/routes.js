const express = require('express')
const router = express.Router()

const driverController = require('./../controllers/driver_controller')

router
  .get('/', driverController.greeting)
  .post('/drivers', driverController.create)
  .use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
  })

module.exports = router
