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
    UPDATE_COUNTRY_DATA(state, countryEdits) {
      /* eslint-disable */ console.log(state);
      /* eslint-disable */ console.log(countryEdits);
    }
  },

  actions: {
    submitCountryEdit(store, countryEdits) {
      /* eslint-disable */ console.log(store);
      /* eslint-disable */ console.log(countryEdits);
      // ToDo
      store.commit('UPDATE_COUNTRY_DATA', countryEdits);
    }
  }
});