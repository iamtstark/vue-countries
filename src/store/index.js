import Vuex from 'vuex';
import Vue from 'vue';

import { countries } from './countries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries,
    isInEditMode: false
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
    SET_IS_IN_EDIT_MODE(state, bool) {
      state.isInEditMode = bool;
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
    setIsInEditMode(store, bool) {
      store.commit('SET_IS_IN_EDIT_MODE', bool);
    },
    submitCountryEdit(store, countryEdits) {
      store.commit('UPDATE_COUNTRY_DATA', countryEdits);
    }
  }
});