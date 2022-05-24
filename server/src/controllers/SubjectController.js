const { Subject } = require('../models')
const SubjectVisitController = require('./SubjectVisitController')

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
  async show (req, res) {
    try {
      const subject = await Subject.findByPk(req.params.id)
      res.send(subject)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the subject'
      })
    }
  },
  async post (req, res) {
    try {
      const subject = await Subject.create(req.body)
      res.send(subject);
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}
