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
    UPDATE_COUNTRY_DATA(state, { originalCode, code, name }) {
      state.countries.map(item => {
        if (item.code === originalCode) {
          item.code = code;
          item.name = name;
        }
      });
    }
  },
  actions: {
    submitCountryEdit(store, countryEdits) {
      store.commit('UPDATE_COUNTRY_DATA', countryEdits);
    }
  }
});