const MedicationController = require('./controllers/MedicationController')
const SubjectVisitController = require('./controllers/SubjectVisitController')
const SubjectController = require('./controllers/SubjectController')

module.exports = (app) => {

  app.get('/subjects', SubjectController.index) // done

  app.get('/subject/:id', SubjectController.show) // done

  app.post('/add-subject', SubjectController.post) // done

  app.get('/medication', MedicationController.index) // done

  app.get('/assign-medication/:type', MedicationController.assign) // done

  app.post('/upload-medication', MedicationController.upload)

  app.put('/update-medication/:id', MedicationController.update)
    
  app.get('/visits/:subjectId', SubjectVisitController.index)

  app.post('/add-visit', SubjectVisitController.post)

  app.delete('/delete-visit/:visitId', SubjectVisitController.delete)

}
