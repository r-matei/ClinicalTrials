import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VuePapaParse from 'vue-papa-parse'

Vue.config.productionTip = false
Vue.use(VuePapaParse)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
