import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Subjects from '../views/Subjects'
import Medication from '../views/Medication'
import Reports from '../views/Reports'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/subjects',
      name: 'Subjects',
      component: Subjects
    },
    {
      path: '/subject/:subjectId',
      name: 'Subject',
      component: Subjects
    },
    {
      path: '/medication',
      name: 'Medication',
      component: Medication
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
