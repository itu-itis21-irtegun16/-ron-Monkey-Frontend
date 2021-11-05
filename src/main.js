import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueMobileDetection from 'vue-mobile-detection'
import axios from "axios";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'


const axiosInstance = axios.create({
  baseURL: "http://54.161.66.135/"
});

Vue.prototype.$axios = axiosInstance; 

Vue.use(VueMobileDetection)
Vue.use(Vuelidate)
TimeAgo.addDefaultLocale(en)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
