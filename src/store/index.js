import Vuex from 'vuex';
import Vue from 'vue';

import { countries } from './countries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries
  },

  getters: {
    getAllCountries(state) {
      return state.countries;
    }
  },

  mutations: {
  },

  actions: {
  }
});