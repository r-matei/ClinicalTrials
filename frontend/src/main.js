import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify({
    icons: {
      defaultSet: 'mdi'
    }
  }),
  components: { App },
  template: '<App/>'
})
