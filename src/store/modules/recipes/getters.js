export default {
    recipe(state, _, _2, rootGetters) {
        return state.recipes[rootGetters.recipeId];
    },
}