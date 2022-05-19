import Api from '@/services/Api'

export default {
  // show all subjects
  index () {
    return Api().get('subjects')
  },

  // add a new subject
  post (subject) {
    return Api().put('add-subject', subject)
  }
}
