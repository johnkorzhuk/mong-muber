const express = require('express')
const router = express.Router()

const driverController = require('./../controllers/driver_controller')

router
  .get('/drivers', driverController.index)
  .post('/drivers', driverController.create)
  .put('/drivers/:id', driverController.edit)
  .delete('/drivers/:id', driverController.delete)
  .use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
  })

module.exports = router
