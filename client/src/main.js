import Vue from 'vue'
import './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router/routes'
import VueRouter from 'vue-router'
import store from './vuex/store'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.Authorization = process.env.VUE_APP_API_TOKEN;

Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
