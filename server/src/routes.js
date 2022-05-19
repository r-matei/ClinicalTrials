const MedicationController = require('./controllers/MedicationController')
const SubjectVisitController = require('./controllers/SubjectVisitController')
const SubjectController = require('./controllers/SubjectController')

module.exports = (app) => {

  app.get('/subjects', SubjectController.index)

  app.post('/add-subject', SubjectController.post)

  app.get('/medication', MedicationController.index)

  app.post('/upload-medication', MedicationController.upload)
    
  app.get('/visits/:subjectId', SubjectVisitController.index)

  app.post('/add-visit', SubjectVisitController.post)

  app.delete('/delete-visit/:visitId', SubjectVisitController.delete)

}
