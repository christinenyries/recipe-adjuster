import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
    namespaced: true,
    state() {
        return {
            sampleRecipe:
            {
                id: 'r0',
                name: 'Napa Cabbage Kimchi',
                link: 'https://www.maangchi.com/recipe/tongbaechu-kimchi',
                ingredients: [...Array(16).keys()].map(id => `${id}`)
            },
            recipes: [
            ]
        }
    },
    getters,
    actions,
    mutations,
}