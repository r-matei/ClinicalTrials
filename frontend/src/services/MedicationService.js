import Api from '@/services/Api'

export default {
  // get all medications
  index () {
    return Api().get('medication')
  },

  // upload medication file
  upload (data) {
    return Api().post('upload-medication', data)
  },

  assign (type) {
    return Api().get(`assign-medication/${type}`)
  },

  update (id, medication) {
    return Api().put(`update-medication/${id}`, medication)
  }
}
