import Api from '@/services/Api'

export default {
  // get all medications
  index () {
    return Api().get('medication')
  },

  // upload medication file
  upload () {
    return Api().get('upload-medication')
  }
}
