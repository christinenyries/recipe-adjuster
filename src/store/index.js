import Vue from 'vue'
import Vuex from 'vuex'

import recipes from './modules/recipes/index.js'
import amounts from './modules/amounts/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    recipes,
    amounts
  },
})
