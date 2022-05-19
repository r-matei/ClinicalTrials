const {
  sequelize,
  Subject,
  SubjectVisit,
  Medication
} = require('../src/models')

const Promise = require('bluebird')
const subjects = require('./subjects.json')
const visits = require('./visits.json')
const medications = require('./medications.json')

sequelize.sync({force: true}) // {force: true} to delete all tables from database
  .then(async function () {
    await Promise.all(
      subjects.map(subject => {
        Subject.create(subject)
      })
    )

    await Promise.all(
      visits.map(visit => {
        SubjectVisit.create(visit)
      })
    )

    await Promise.all(
      medications.map(medication => {
        Medication.create(medication)
      })
    )
  })