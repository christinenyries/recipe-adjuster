export default {
    adjustServings(state, payload) {
        const { newServings, recipeId } = payload;
        const currServings = state.servings[recipeId];
        for (const ingredientId of Object.keys(state.ingredients[recipeId])) {
            state.ingredients[recipeId][ingredientId] *= (newServings / currServings);
        }
        state.servings[recipeId] = newServings;
    },
}