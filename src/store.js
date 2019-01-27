import Vue from "vue";
import Vuex from "vuex";

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    apiURL: 'https://api.edamam.com/search'
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload;
    },
  },
  actions: {
    async getRecipes({ state, commit }, plan) {
      try {
        let response = await axios.get(`${state.apiURL}`, {
          params: {
            q: plan,
            app_id: '93e63bc7',
            app_key: '8bac168c4cf65ac80926cfe6bc69c9b4',
            from: 0,
            to: 9
          }
        });
        commit('setRecipes', response.data.hits);
      } catch (error) {
        commit('setRecipes', []);
      }      
    }
  }
});
