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
  async update (req, res) {
    try {
      const id = req.params.id
      const medication = await Medication.update(req.body, {
        where: {
          id: id
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'could not update medication'
      })
    }
  },
  async update (req, res) {
    try {
      await Medication.update(req.body, {
        where: {
          id: req.params.id
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to assign the medications'
      })
    }
  },
  async assign (req, res) {
    try {
      const medication = await Medication.findOne({
        where: {
          type: req.params.type,
          status: 'Intact'
        }
      })
      
      res.send(medication)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to assign the medications'
      })
    }
  },
  async upload (req, res) {
    try {
      for (let i = 0; i < req.body.length; i++) {
        console.log(req.body[i])
        await Medication.create({
          type: req.body[i].type,
          status: req.body[i].status
        })
      }

    } catch (error) {
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  }
}
