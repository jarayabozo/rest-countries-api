import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    mode: 'light',
    countries: [],
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
    }
  },
  actions: {
    async getCountriesByRegion(context, country) {
      try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/region/${country}`)
        context.commit("setCountries", response.data);
      }catch(error) {
        console.error(error);
      }
    },
    async getCountries(context) {
      try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/all`)
        context.commit("setCountries", response.data);
      }catch(error) {
        console.error(error);
      }
    },
    async getCountryByName(context, country) {
      try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
        context.commit("setCountries", response.data);
        context.commit("setError", null);
      } catch (error) {
        context.commit("setCountries", []);
        context.commit("setError", error.response.data.message);
        console.clear()
      }
    }
  },
  modules: {
  }
})
