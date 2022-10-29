export default {
    adjustServings(context, payload) {
        const recipeId = context.rootGetters.recipeId

        const newServings = payload.newAmount;
        context.commit('adjustServings', { newServings, recipeId })
    },
    adjustIngredient(context, payload) {
        const recipeId = context.rootGetters.recipeId

        const { ingredientId, newAmount } = payload;

        const currAmount = context.getters.ingredients[ingredientId];
        const currServings = context.getters.servings;

        const newServings = currServings * (newAmount / currAmount)

        context.commit('adjustServings', { newServings, recipeId })
    }
}