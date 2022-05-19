const { Medication } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const medications = await Medication.findAll()
      res.send(medications)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to index the medications'
      })
    }
  },
  async upload (req, res) {
    try {
      // upload json with data
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to upload the medication'
      })
    }
  }
}
