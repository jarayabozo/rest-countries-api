import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
// Import css global
import "./assets/scss/app.scss"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(VueLazyload, {
  preLoad: 5,
  // error: '/image/error.png',
  loading: './images/loader.gif',
  attempt: 1
})

app.config.globalProperties.$appName = "Where in the world?";

app.filter = function(name, fn) {
  app.config.globalProperties[`$${name}`] = fn
}

app.filter('toFormatNumber', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  let val = (value/1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});

app.mount('#app')
