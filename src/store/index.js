import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    mode: 'light',
    countries: null,
    error: null
  },
  mutations: {
    setMode(state, payload) {
      state.mode = payload
    },
    setCountries(state, payload) {
      state.countries = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setMode(state, payload){
      state.error = payload
    }
  },
  actions: {
    async getCountriesByRegion(context, country) {
      try {
        const response = await Vue.axios.get(`https://restcountries.eu/rest/v2/region/${country}`)
        context.commit("setCountries", response.data);
      }catch(error) {
        console.error(error);
      }
    },
    async getCountries(context) {
      try {
        const response = await Vue.axios.get(`https://restcountries.eu/rest/v2/all`)
        context.commit("setCountries", response.data);
      }catch(error) {
        console.error(error);
      }
    },
    async getCountryByName(context, country) {
      try {
        const response = await Vue.axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
        context.commit("setCountries", response.data);
        context.commit("setError", null);
      } catch (error) {
        context.commit("setCountries", []);
        context.commit("setError", error.response.data.message);
        console.clear()
      }
    },
    updateMode(context) {
      this.isActive = !this.isActive;
    }
  },
  modules: {
  }
})
