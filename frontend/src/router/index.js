import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: () => import('../views/Subjects.vue')
  },
  {
    path: '/subject/:subjectId',
    name: 'Subject',
    component: () => import('../views/Subject.vue')
  },
  {
    path: '/medication',
    name: 'medications',
    component: () => import('../views/Medication.vue')
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../views/Reports.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
