export default {
    ingredients(state, _, _2, rootGetters) {
        const recipeId = rootGetters.recipeId;
        return state.ingredients[recipeId];
    },
    servings(state, _, _2, rootGetters) {
        const recipeId = rootGetters.recipeId;
        return state.servings[recipeId];
    },
    amounts(_, getters) {
        return {
            ingredients: getters.ingredients,
            servings: getters.servings
        }
    }
}