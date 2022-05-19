const { Subject } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const subjects = await Subject.findAll()
      res.send(subjects)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to index the subjects'
      })
    }
  },
  async post (req, res) {
    try {
      const subject = await Subject.create(req.body)
      res.send(subject);
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to screen this subject'
      })
    }
  }
}
