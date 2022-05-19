import Api from '@/services/Api'

export default {
  // get all visits for a specific subject
  index (subjectId) {
    return Api().get(`visits/${subjectId}`)
  },

  // add a new visit
  post (visit) {
    return Api().post('add-visit', visit)
  },

  // delete visit
  delete (visitId) {
    return Api().delete(`delete-visit/${visitId}`)
  }
}
