import Vue from 'vue'
import Vuex from 'vuex'

import recipes from './modules/recipes/index.js'
import amounts from './modules/amounts/index.js'

import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipeId: 'r0',
  },
  modules: {
    recipes,
    amounts
  },
  getters
})
