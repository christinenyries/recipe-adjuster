import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
    namespaced: true,
    state() {
        return {
            sampleServings: {
                recipeId: 'r0',
                value: 1
            },
            servings: []
        }
    },
    getters,
    actions,
    mutations,
}