const { SubjectVisit } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      var visits
      const subjectId = req.params.subjectId
      visits = await SubjectVisit.findAll({
        where: {
          subjectid: subjectId
        }
      })
      res.send(visits)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the subjects appointments'
      })
    }
  },
  async post (req, res) {
    try {
      const visit = await SubjectVisit.create(req.body)
      res.send(visit)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create this appointment'
      })
    }
  },
  async delete (req, res) {
    try {
      const visit = await SubjectVisit.findByPk(req.params.visitId)
      await visit.destroy()
      res.send(visit)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete this appointment'
      })
    }
  }
}
