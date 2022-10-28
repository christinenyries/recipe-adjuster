import Vue from 'vue'
import Vuex from 'vuex'
import recipes from './modules/recipes/index.js'
import ingredients from './modules/ingredients/index.js'
import servings from './modules/servings/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  modules: {
    recipes,
    ingredients,
    servings
  }
})
