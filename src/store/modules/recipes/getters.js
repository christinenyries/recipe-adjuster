export default {
    recipes(state) {
        return state.recipes
    },
    hasRecipes(state) {
        return state.recipes && state.recipes.length > 0;
    },
    sample(state) {
        return state.sample
    }
}