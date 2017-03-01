const Driver = require('./../models/driver')

module.exports = {
  greeting (req, res) {
    res.send({ message: 'Hello' })
  },
  create (req, res, next) {
    const driverProps = req.body

    Driver.create(driverProps)
      .then((driver) => {
        res.send(driver)
      })
      .catch(next)
  },
  edit (req, res, next) {
    const { id } = req.params
    const props = req.body

    Driver.findByIdAndUpdate({ _id: id }, props)
      .then(() => Driver.findById(id))
      .then((driver) => res.send(driver))
      .catch(next)
  },
  delete (req, res, next) {
    const { id } = req.params

    Driver.findByIdAndRemove(id)
      .then((driver) => {
        res.status(204).send(driver)
      })
      .catch(next)
  }
}
