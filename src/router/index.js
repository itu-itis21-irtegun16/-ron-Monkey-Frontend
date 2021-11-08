import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import SignIn from '../views/Sign-in.vue'
import FoodList from '../views/FoodList.vue'
import Calendar from '../views/Schedule.vue'
import WiseSaying from '../views/WiseSaying.vue'
import Account from '../views/Account.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/sign-in',
    name: 'Sign-in',
    component: SignIn
  },
  {
    path: '/food-list',
    name: 'food-list',
    component: FoodList
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/wise-saying',
    name: 'wise-saying',
    component: WiseSaying
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
