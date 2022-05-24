import Api from '@/services/Api'

export default {
  // show all subjects
  index () {
    return Api().get('subjects')
  },

  //show subject by id
  show (id) {
    return Api().get(`subject/${id}`)
  },

  // add a new subject
  post (subject) {
    return Api().post('add-subject', subject)
  }
}
