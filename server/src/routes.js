const MedicationController = require('./controllers/MedicationController')
const SubjectVisitController = require('./controllers/SubjectVisitController')
const SubjectController = require('./controllers/SubjectController')

module.exports = (app) => {

  app.get('/subjects', SubjectController.index) // done

  app.post('/add-subject', SubjectController.post) // done

  app.get('/medication', MedicationController.index) // done

  app.post('/upload-medication', MedicationController.upload)
    
  app.get('/visits/:subjectId', SubjectVisitController.index)

  app.post('/add-visit', SubjectVisitController.post)

  app.delete('/delete-visit/:visitId', SubjectVisitController.delete)

}
