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
    DELETE_COUNTRY(state, code) {
      state.countries.splice(
        state.countries.findIndex((item) => item.code === code),
        1
      );
    },
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
    deleteCountry(store, code) {
      store.commit('DELETE_COUNTRY', code);
    },
    submitCountryEdit(store, countryEdits) {
      store.commit('UPDATE_COUNTRY_DATA', countryEdits);
    }
  }
});