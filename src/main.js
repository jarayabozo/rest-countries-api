import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
// Import css global
import "./assets/scss/app.scss"

Vue.use(VueAxios, axios)
Vue.use(VueLazyload, {
  preLoad: 5,
  // error: '/image/error.png',
  loading: './images/loader.gif',
  attempt: 1
})

Vue.prototype.$appName = "Where in the world?";

Vue.config.productionTip = false

Vue.filter('toFormatNumber', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  let val = (value/1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
